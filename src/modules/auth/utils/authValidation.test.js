import assert from 'node:assert/strict'
import test from 'node:test'

import {
  createRegistrationPayload,
  validateEmail,
  validateLoginForm,
  validateRegistrationForm,
  validateResetForm,
} from './authValidation.js'

test('validateLoginForm requires account and password', () => {
  assert.deepEqual(validateLoginForm({ account: '', password: '' }), {
    account: 'Tên đăng nhập hoặc Email không được để trống.',
    password: 'Mật khẩu không được để trống.',
  })
})

test('validateEmail rejects malformed addresses', () => {
  assert.equal(validateEmail('student@example.com'), true)
  assert.equal(validateEmail('student@'), false)
})

test('validateRegistrationForm accepts valid registration data for supported roles', () => {
  for (const role of ['ADMIN', 'INSTRUCTOR', 'STUDENT']) {
    assert.deepEqual(
      validateRegistrationForm({
        username: 'Student_01',
        email: 'student.01@gmail.com',
        password: 'secret12',
        confirmPassword: 'secret12',
        displayName: 'Nguyễn Văn A',
        role,
        yearOfBirth: '2000',
        homeTown: 'Hải Dương',
      }),
      {},
    )
  }
})

test('validateRegistrationForm rejects a mismatched confirmation password', () => {
  assert.equal(
    validateRegistrationForm({
      email: 'student@example.com',
      username: 'student01',
      password: 'secret12',
      confirmPassword: 'different',
      displayName: 'Nguyễn Văn A',
      role: 'STUDENT',
      yearOfBirth: '',
      homeTown: '',
    }).confirmPassword,
    'Mật khẩu nhập lại không khớp.',
  )
})

test('validateRegistrationForm reports missing fields without throwing', () => {
  const errors = validateRegistrationForm({})

  assert.ok(errors.username)
  assert.ok(errors.email)
  assert.ok(errors.password)
  assert.ok(errors.confirmPassword)
  assert.ok(errors.displayName)
  assert.ok(errors.role)
})

test('registration validation checks required fields, limits, and patterns', () => {
  const errors = validateRegistrationForm({
    username: 'bad-name',
    email: 'a..b@gmail.com',
    password: 'p'.repeat(51),
    confirmPassword: 'p'.repeat(51),
    displayName: 'x'.repeat(201),
    role: 'X'.repeat(21),
    yearOfBirth: '20a0',
    homeTown: 'x'.repeat(201),
  })

  assert.ok(errors.username)
  assert.ok(errors.email)
  assert.ok(errors.password)
  assert.ok(errors.confirmPassword)
  assert.ok(errors.displayName)
  assert.ok(errors.role)
  assert.ok(errors.yearOfBirth)
  assert.ok(errors.homeTown)
})

test('createRegistrationPayload matches the student registration API contract', () => {
  assert.deepEqual(
    createRegistrationPayload({
      username: ' VanNT_Buyer ',
      email: ' nguyenthivanhs98@gmail.com ',
      password: 'secret12',
      confirmPassword: 'secret12',
      displayName: ' Nguyễn Văn A ',
      role: 'STUDENT',
      yearOfBirth: ' 2000 ',
      homeTown: ' Hải Dương ',
      ignored: 'value',
    }),
    {
      username: 'VanNT_Buyer',
      email: 'nguyenthivanhs98@gmail.com',
      password: 'secret12',
      confirmPassword: 'secret12',
      displayName: 'Nguyễn Văn A',
      role: 'STUDENT',
      yearOfBirth: '2000',
      homeTown: 'Hải Dương',
    },
  )
})

test('validateResetForm blocks the administrator email', () => {
  assert.equal(
    validateResetForm('admin@gmail.com'),
    'Đây là tài khoản quản trị, vui lòng liên hệ bộ phận kỹ thuật để cấp lại mật khẩu.',
  )
})
