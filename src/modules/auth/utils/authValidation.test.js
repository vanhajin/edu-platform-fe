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

test('validateRegistrationForm accepts the three supported roles', () => {
  for (const role of ['ADMIN', 'INSTRUCTOR', 'STUDENT']) {
    assert.deepEqual(
      validateRegistrationForm({
        email: 'student@example.com',
        password: 'secret12',
        confirmPassword: 'secret12',
        fullName: 'Nguyễn Văn A',
        role,
      }),
      {},
    )
  }
})

test('validateRegistrationForm rejects a mismatched confirmation password', () => {
  assert.equal(
    validateRegistrationForm({
      email: 'student@example.com',
      password: 'secret12',
      confirmPassword: 'different',
      fullName: 'Nguyễn Văn A',
      role: 'STUDENT',
    }).confirmPassword,
    'Mật khẩu nhập lại không khớp.',
  )
})

test('createRegistrationPayload sends only the backend contract fields', () => {
  assert.deepEqual(
    createRegistrationPayload({
      email: ' student@example.com ',
      password: 'secret12',
      fullName: ' Nguyễn Văn A ',
      role: 'STUDENT',
      ignored: 'value',
    }),
    {
      email: 'student@example.com',
      password: 'secret12',
      fullName: 'Nguyễn Văn A',
      role: 'STUDENT',
    },
  )
})

test('validateResetForm blocks the administrator email', () => {
  assert.equal(
    validateResetForm('admin@gmail.com'),
    'Đây là tài khoản quản trị, vui lòng liên hệ bộ phận kỹ thuật để cấp lại mật khẩu.',
  )
})
