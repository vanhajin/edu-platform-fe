const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const GMAIL_PATTERN = /^(?=.{1,30}@gmail\.com$)[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@gmail\.com$/i
const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/
const SUPPORTED_ROLES = new Set(['ADMIN', 'INSTRUCTOR', 'STUDENT'])

export function validateEmail(email) {
  return EMAIL_PATTERN.test(email.trim())
}

export function validateGmail(email) {
  return GMAIL_PATTERN.test(email.trim())
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
  username = '',
  email = '',
  password,
  confirmPassword,
  displayName = '',
  role = '',
  yearOfBirth = '',
  homeTown = '',
} = {}) {
  const errors = {}

  if (!username.trim()) {
    errors.username = 'Tên đăng nhập không được để trống.'
  } else if (username.length > 50) {
    errors.username = 'Tên đăng nhập không được vượt quá 50 ký tự.'
  } else if (!USERNAME_PATTERN.test(username)) {
    errors.username = 'Tên đăng nhập chỉ được chứa chữ cái, chữ số và dấu gạch dưới (_).'
  }

  if (!email.trim()) {
    errors.email = 'Địa chỉ Email không được để trống.'
  } else if (email.trim().length > 100) {
    errors.email = 'Địa chỉ Email không được vượt quá 100 ký tự.'
  } else if (!validateGmail(email)) {
    errors.email = 'Vui lòng nhập địa chỉ Gmail hợp lệ (ví dụ: ten@gmail.com).'
  }

  if (!password) {
    errors.password = 'Mật khẩu không được để trống.'
  } else if (password.length > 50) {
    errors.password = 'Mật khẩu không được vượt quá 50 ký tự.'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Vui lòng nhập lại mật khẩu.'
  } else if (confirmPassword.length > 50) {
    errors.confirmPassword = 'Mật khẩu nhập lại không được vượt quá 50 ký tự.'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp.'
  }

  if (!displayName.trim()) {
    errors.displayName = 'Tên hiển thị không được để trống.'
  } else if (displayName.length > 200) {
    errors.displayName = 'Tên hiển thị không được vượt quá 200 ký tự.'
  }

  if (!role) {
    errors.role = 'Vui lòng chọn vai trò.'
  } else if (role.length > 20 || !SUPPORTED_ROLES.has(role)) {
    errors.role = 'Vui lòng chọn quyền tài khoản hợp lệ.'
  }

  if (yearOfBirth && !/^\d{1,4}$/.test(yearOfBirth)) {
    errors.yearOfBirth = 'Năm sinh chỉ được chứa tối đa 4 chữ số.'
  }

  if (homeTown.length > 200) {
    errors.homeTown = 'Quê quán không được vượt quá 200 ký tự.'
  }

  return errors
}

export function createRegistrationPayload(formData) {
  return {
    username: formData.username.trim(),
    email: formData.email.trim(),
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    displayName: formData.displayName.trim(),
    role: formData.role,
    yearOfBirth: formData.yearOfBirth.trim(),
    homeTown: formData.homeTown.trim(),
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
