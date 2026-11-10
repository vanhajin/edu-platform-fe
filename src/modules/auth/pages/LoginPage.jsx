import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthLayout, { AuthLink } from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import { authService } from '../services/authService.js'
import { getApiErrorMessage } from '../utils/apiError.js'
import { completeLogin } from '../utils/authSession.js'
import { validateLoginForm } from '../utils/authValidation.js'

const INITIAL_FORM = { account: '', password: '', rememberMe: false }

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(event) {
    const { name, value, checked, type } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateLoginForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await authService.login({
        email: formData.account.trim(),
        password: formData.password,
      })
      const destination = completeLogin(response)
      navigate(destination, { replace: true })
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, 'Đăng nhập thất bại. Vui lòng thử lại.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      footer={
        <>
          Bạn chưa có tài khoản? <AuthLink to="/register">Đăng ký ngay</AuthLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id="login-account"
          name="account"
          type="text"
          label="Tên đăng nhập hoặc Email"
          placeholder="Nhập tài khoản của bạn..."
          maxLength={50}
          value={formData.account}
          onChange={updateField}
          error={errors.account}
        />

        <FormField
          id="login-password"
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="••••••••"
          maxLength={32}
          value={formData.password}
          onChange={updateField}
          error={errors.password}
        />

        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={updateField}
            />
            Ghi nhớ đăng nhập
          </label>
          <AuthLink to="/reset-password" className="forgot-pass">
            Quên mật khẩu?
          </AuthLink>
        </div>

        {submitError && <div className="form-alert error-alert">{submitError}</div>}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </button>
      </form>
    </AuthLayout>
  )
}
