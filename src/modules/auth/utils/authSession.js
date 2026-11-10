const ROLE_DESTINATIONS = {
  ADMIN: '/admin',
  INSTRUCTOR: '/instructor',
  STUDENT: '/student',
}

export function normalizeAuthPayload(payload) {
  const responseBody = payload?.data ?? payload ?? {}
  return responseBody?.data ?? responseBody
}

export function saveAuthSession(payload) {
  const authData = normalizeAuthPayload(payload)
  const accessToken = authData.accessToken ?? authData.token

  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('auth_user')
  localStorage.setItem('access_token', accessToken)

  if (authData.refreshToken) {
    localStorage.setItem('refresh_token', authData.refreshToken)
  }

  if (authData.user) {
    localStorage.setItem('auth_user', JSON.stringify(authData.user))
  }

  return authData
}

export function getRoleDestination(role) {
  return ROLE_DESTINATIONS[String(role ?? '').toUpperCase()] ?? null
}

export function completeLogin(payload) {
  const authData = normalizeAuthPayload(payload)
  const destination = getRoleDestination(authData.user?.role)
  const accessToken = authData.accessToken ?? authData.token

  if (typeof accessToken !== 'string' || !accessToken.trim()) {
    throw new Error('Phản hồi không chứa token đăng nhập hợp lệ.')
  }

  if (!destination) {
    throw new Error('Tài khoản chưa có quyền truy cập hợp lệ.')
  }

  saveAuthSession(authData)
  return destination
}
