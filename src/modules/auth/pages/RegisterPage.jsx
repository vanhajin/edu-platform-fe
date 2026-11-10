import { useState } from 'react'

import AuthLayout, { AuthLink } from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import { authService } from '../services/authService.js'
import { getApiErrorMessage } from '../utils/apiError.js'
import {
  createRegistrationPayload,
  validateRegistrationForm,
} from '../utils/authValidation.js'

const INITIAL_FORM = {
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  role: 'STUDENT',
}

export default function RegisterPage() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setMessage({ type: '', text: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateRegistrationForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      await authService.register(createRegistrationPayload(formData))
      setMessage({ type: 'success', text: 'Đăng ký tài khoản thành công.' })
      setFormData(INITIAL_FORM)
    } catch (error) {
      setMessage({
        type: 'error',
        text: getApiErrorMessage(error, 'Đăng ký thất bại. Vui lòng thử lại.'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Đăng ký tài khoản"
      footer={
        <>
          Bạn đã có tài khoản? <AuthLink to="/login">Đăng nhập tại đây</AuthLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id="full-name"
          name="fullName"
          type="text"
          label="Họ và tên"
          placeholder="Ví dụ: Nguyễn Văn A"
          maxLength={50}
          value={formData.fullName}
          onChange={updateField}
          error={errors.fullName}
          required
        />

        <FormField
          id="register-email"
          name="email"
          type="email"
          label="Địa chỉ Email"
          placeholder="example@gmail.com"
          maxLength={50}
          value={formData.email}
          onChange={updateField}
          error={errors.email}
          required
        />

        <FormField
          id="register-password"
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="Tối thiểu 6 ký tự"
          maxLength={32}
          value={formData.password}
          onChange={updateField}
          error={errors.password}
          required
        />

        <FormField
          id="confirm-password"
          name="confirmPassword"
          type="password"
          label="Nhập lại mật khẩu"
          placeholder="Xác nhận lại mật khẩu"
          maxLength={32}
          value={formData.confirmPassword}
          onChange={updateField}
          error={errors.confirmPassword}
          required
        />

        {message.text && (
          <div className={`form-alert ${message.type}-alert`}>{message.text}</div>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Đang đăng ký...' : 'Đăng Ký Ngay'}
        </button>
      </form>
    </AuthLayout>
  )
}
