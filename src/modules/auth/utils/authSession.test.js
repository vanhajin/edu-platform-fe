import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'

import {
  completeLogin,
  getDeviceId,
  getRoleDestination,
  isTokenExpired,
  saveRefreshedSession,
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

test('getDeviceId creates and reuses a UUID for login requests', () => {
  const firstDeviceId = getDeviceId()
  const secondDeviceId = getDeviceId()

  assert.match(firstDeviceId, /^[0-9a-f-]{36}$/i)
  assert.equal(secondDeviceId, firstDeviceId)
  assert.equal(localStorage.getItem('device_id'), firstDeviceId)
})

test('isTokenExpired detects an expired JWT access token', () => {
  const expiredToken = `header.${Buffer.from(JSON.stringify({ exp: 1000 })).toString('base64url')}.signature`
  const validToken = `header.${Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 60 })).toString('base64url')}.signature`

  assert.equal(isTokenExpired(expiredToken), true)
  assert.equal(isTokenExpired(validToken), false)
})

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

test('saveRefreshedSession replaces access token and preserves session data', () => {
  localStorage.setItem('access_token', 'expired-access-token')
  localStorage.setItem('refresh_token', 'refresh-token')
  localStorage.setItem('auth_user', JSON.stringify({ role: 'STUDENT' }))

  saveRefreshedSession({ data: { accessToken: 'new-access-token' } })

  assert.equal(localStorage.getItem('access_token'), 'new-access-token')
  assert.equal(localStorage.getItem('refresh_token'), 'refresh-token')
  assert.deepEqual(JSON.parse(localStorage.getItem('auth_user')), { role: 'STUDENT' })
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

test('completeLogin routes and persists user info from the login API contract', () => {
  const destination = completeLogin({
    data: {
      accessToken: 'contract-access-token',
      refreshToken: 'contract-refresh-token',
      info: { userId: 'ADMIN-1', username: 'admin', role: 'ADMIN' },
    },
  })

  assert.equal(destination, '/admin')
  assert.equal(localStorage.getItem('access_token'), 'contract-access-token')
  assert.equal(localStorage.getItem('refresh_token'), 'contract-refresh-token')
  assert.deepEqual(JSON.parse(localStorage.getItem('auth_user')), {
    userId: 'ADMIN-1',
    username: 'admin',
    role: 'ADMIN',
  })
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
