const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const SUPPORTED_ROLES = new Set(['ADMIN', 'INSTRUCTOR', 'STUDENT'])

export function validateEmail(email) {
  return EMAIL_PATTERN.test(email.trim())
}

export function validateLoginForm({ account, password }) {
  const errors = {}
  const normalizedAccount = account.trim()

  if (!normalizedAccount) {
    errors.account = 'Tên đăng nhập hoặc Email không được để trống.'
  } else if (normalizedAccount.includes('@') && !validateEmail(normalizedAccount)) {
    errors.account = 'Định dạng Email không hợp lệ.'
  }

  if (!password) {
    errors.password = 'Mật khẩu không được để trống.'
  }

  return errors
}

export function validateRegistrationForm({
  email,
  password,
  confirmPassword,
  fullName,
  role,
}) {
  const errors = {}

  if (!fullName.trim()) {
    errors.fullName = 'Họ và tên không được để trống.'
  } else if (fullName.trim().length < 2) {
    errors.fullName = 'Họ và tên phải chứa ít nhất 2 ký tự.'
  }

  if (!email.trim()) {
    errors.email = 'Địa chỉ Email không được để trống.'
  } else if (!validateEmail(email)) {
    errors.email = 'Định dạng Email không hợp lệ.'
  }

  if (!password) {
    errors.password = 'Mật khẩu không được để trống.'
  } else if (password.length < 6) {
    errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự.'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Vui lòng nhập lại mật khẩu.'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp.'
  }

  if (!SUPPORTED_ROLES.has(role)) {
    errors.role = 'Vui lòng chọn quyền tài khoản hợp lệ.'
  }

  return errors
}

export function createRegistrationPayload(formData) {
  return {
    email: formData.email.trim(),
    password: formData.password,
    fullName: formData.fullName.trim(),
    role: formData.role,
  }
}

export function validateResetForm(email) {
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail) {
    return 'Vui lòng nhập địa chỉ Email để khôi phục.'
  }

  if (!validateEmail(normalizedEmail)) {
    return 'Định dạng Email không hợp lệ.'
  }

  if (normalizedEmail === 'admin@gmail.com') {
    return 'Đây là tài khoản quản trị, vui lòng liên hệ bộ phận kỹ thuật để cấp lại mật khẩu.'
  }

  return ''
}
