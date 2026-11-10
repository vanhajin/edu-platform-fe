import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'

import {
  completeLogin,
  getRoleDestination,
  saveAuthSession,
} from './authSession.js'

const storage = new Map()

globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
  clear: () => storage.clear(),
}

afterEach(() => storage.clear())

test('saveAuthSession persists tokens returned with user data', () => {
  saveAuthSession({
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    user: { id: 7, role: 'ADMIN' },
  })

  assert.equal(localStorage.getItem('access_token'), 'access-token')
  assert.equal(localStorage.getItem('refresh_token'), 'refresh-token')
  assert.deepEqual(JSON.parse(localStorage.getItem('auth_user')), {
    id: 7,
    role: 'ADMIN',
  })
})

test('saveAuthSession accepts a nested API payload', () => {
  saveAuthSession({
    data: {
      token: 'nested-access-token',
      user: { id: 8, role: 'STUDENT' },
    },
  })

  assert.equal(localStorage.getItem('access_token'), 'nested-access-token')
  assert.equal(localStorage.getItem('refresh_token'), null)
  assert.equal(JSON.parse(localStorage.getItem('auth_user')).role, 'STUDENT')
})

test('getRoleDestination maps only supported roles', () => {
  assert.equal(getRoleDestination('ADMIN'), '/admin')
  assert.equal(getRoleDestination('instructor'), '/instructor')
  assert.equal(getRoleDestination('STUDENT'), '/student')
  assert.equal(getRoleDestination('SELLER'), null)
  assert.equal(getRoleDestination(undefined), null)
})

test('completeLogin rejects unsupported roles without persisting tokens', () => {
  assert.throws(
    () =>
      completeLogin({
        data: {
          accessToken: 'must-not-be-stored',
          user: { role: 'SELLER' },
        },
      }),
    /quyền truy cập hợp lệ/,
  )

  assert.equal(localStorage.getItem('access_token'), null)
})

test('completeLogin rejects a response without a usable access token', () => {
  assert.throws(
    () => completeLogin({ data: { user: { role: 'STUDENT' } } }),
    /token đăng nhập hợp lệ/,
  )
  assert.throws(
    () =>
      completeLogin({
        data: { accessToken: { invalid: true }, user: { role: 'ADMIN' } },
      }),
    /token đăng nhập hợp lệ/,
  )
})

test('completeLogin removes tokens omitted by the new session', () => {
  localStorage.setItem('refresh_token', 'previous-user-refresh-token')

  completeLogin({
    data: {
      accessToken: 'new-access-token',
      user: { id: 9, role: 'INSTRUCTOR' },
    },
  })

  assert.equal(localStorage.getItem('access_token'), 'new-access-token')
  assert.equal(localStorage.getItem('refresh_token'), null)
})
