const ROLE_DESTINATIONS = {
  ADMIN: '/admin',
  INSTRUCTOR: '/instructor',
  STUDENT: '/student',
}

const DEVICE_ID_KEY = 'device_id'

export function getDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY)

  if (!deviceId) {
    deviceId = crypto.randomUUID()
    localStorage.setItem(DEVICE_ID_KEY, deviceId)
  }

  return deviceId
}

export function isTokenExpired(token) {
  if (typeof token !== 'string' || !token.trim()) return true

  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()
  } catch {
    return true
  }
}

export function clearAuthSession() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('auth_user')
}

export function normalizeAuthPayload(payload) {
  const responseBody = payload?.data ?? payload ?? {}
  const authData = responseBody?.data ?? responseBody

  if (authData?.user || !authData?.info) {
    return authData
  }

  return { ...authData, user: authData.info }
}

export function saveAuthSession(payload) {
  const authData = normalizeAuthPayload(payload)
  const accessToken = authData.accessToken ?? authData.token

  clearAuthSession()
  localStorage.setItem('access_token', accessToken)

  if (authData.refreshToken) {
    localStorage.setItem('refresh_token', authData.refreshToken)
  }

  if (authData.user) {
    localStorage.setItem('auth_user', JSON.stringify(authData.user))
  }

  return authData
}

export function saveRefreshedSession(payload) {
  const authData = normalizeAuthPayload(payload)
  const accessToken = authData.accessToken ?? authData.token

  if (typeof accessToken !== 'string' || !accessToken.trim()) {
    throw new Error('Refresh không trả về access token hợp lệ.')
  }

  localStorage.setItem('access_token', accessToken)
  if (authData.refreshToken) {
    localStorage.setItem('refresh_token', authData.refreshToken)
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
