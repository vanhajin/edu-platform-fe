import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthLayout, { AuthLink } from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import { authService } from '../services/authService.js'
import { getApiErrorMessage } from '../utils/apiError.js'
import {
  createRegistrationPayload,
  validateRegistrationForm,
} from '../utils/authValidation.js'

const INITIAL_FORM = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  displayName: '',
  yearOfBirth: '',
  homeTown: '',
  role: 'STUDENT',
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [apiAlert, setApiAlert] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!apiAlert) return undefined

    const dismissDelay = apiAlert.type === 'success' ? 1200 : 3500
    const timeoutId = window.setTimeout(() => {
      setApiAlert(null)
      if (apiAlert.type === 'success') {
        navigate('/login', { replace: true })
      }
    }, dismissDelay)

    return () => window.clearTimeout(timeoutId)
  }, [apiAlert, navigate])

  function updateField(event) {
    const { name, value } = event.target
    const nextValue = name === 'yearOfBirth'
      ? value.replace(/\D/g, '').slice(0, 4)
      : value
    setFormData((current) => ({ ...current, [name]: nextValue }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setApiAlert(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateRegistrationForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await authService.register(createRegistrationPayload(formData))
      const responseData = response?.data
      const isSuccessful =
        response?.status === 200 &&
        (responseData?.code == null || String(responseData.code) === '200')

      if (!isSuccessful) {
        setApiAlert({
          type: 'error',
          text: responseData?.message || 'Đăng ký thất bại. Vui lòng thử lại.',
        })
        return
      }

      setApiAlert({
        type: 'success',
        text: responseData?.message || 'Đăng ký tài khoản thành công.',
      })
    } catch (error) {
      setApiAlert({
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
          id="register-username"
          name="username"
          type="text"
          label="Tên đăng nhập"
          placeholder="Ví dụ: VanNT_Buyer"
          maxLength={50}
          pattern="[A-Za-z0-9_]+"
          value={formData.username}
          onChange={updateField}
          error={errors.username}
          required
        />

        <FormField
          id="display-name"
          name="displayName"
          type="text"
          label="Tên hiển thị"
          placeholder="Ví dụ: Nguyễn Văn A"
          maxLength={200}
          value={formData.displayName}
          onChange={updateField}
          error={errors.displayName}
          required
        />

        <FormField
          id="year-of-birth"
          name="yearOfBirth"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{0,4}"
          label="Năm sinh"
          placeholder="Ví dụ: 2000"
          maxLength={4}
          value={formData.yearOfBirth}
          onChange={updateField}
          error={errors.yearOfBirth}
        />

        <FormField
          id="hometown"
          name="homeTown"
          type="text"
          label="Quê quán"
          placeholder="Ví dụ: Hải Dương"
          maxLength={200}
          value={formData.homeTown}
          onChange={updateField}
          error={errors.homeTown}
        />

        <FormField
          id="register-email"
          name="email"
          type="email"
          label="Địa chỉ Email"
          placeholder="example@gmail.com"
          maxLength={100}
          pattern="[A-Za-z0-9]+(\.[A-Za-z0-9]+)*@gmail\.com"
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
          placeholder="Nhập mật khẩu"
          maxLength={50}
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
          maxLength={50}
          value={formData.confirmPassword}
          onChange={updateField}
          error={errors.confirmPassword}
          required
        />

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Đang đăng ký...' : 'Đăng Ký Ngay'}
        </button>
      </form>
      {apiAlert && (
        <div
          className={`api-alert ${apiAlert.type}-alert`}
          role={apiAlert.type === 'error' ? 'alert' : 'status'}
        >
          {apiAlert.text}
        </div>
      )}
    </AuthLayout>
  )
}
