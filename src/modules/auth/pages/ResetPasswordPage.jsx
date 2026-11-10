import { useState } from 'react'

import AuthLayout, { AuthLink } from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import { authService } from '../services/authService.js'
import { getApiErrorMessage } from '../utils/apiError.js'
import { validateResetForm } from '../utils/authValidation.js'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateResetForm(email)

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      await authService.resetPassword({ email: email.trim() })
      setSuccess(`Hệ thống đã gửi thông tin cấp lại mật khẩu tới ${email.trim()}.`)
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, 'Không thể gửi yêu cầu cấp lại mật khẩu.'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Cài đặt lại mật khẩu"
      description="Vui lòng nhập chính xác địa chỉ Email để hệ thống xác thực tài khoản và gửi thông tin cấp lại mật khẩu mới."
      footer={
        <AuthLink to="/login" className="back-to-login">
          ← Quay lại trang đăng nhập
        </AuthLink>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id="reset-email"
          name="email"
          type="email"
          label="Địa chỉ Email"
          placeholder="example@gmail.com"
          maxLength={50}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError('')
            setSuccess('')
          }}
          error={error}
        />

        {success && <div className="form-alert success-alert">{success}</div>}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Gửi thông tin cấp lại mật khẩu'}
        </button>
      </form>
    </AuthLayout>
  )
}
