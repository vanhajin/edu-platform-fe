import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, RegisterPage, ResetPasswordPage } from './modules/auth/index.js'
import './modules/auth/styles/auth.css'

function DestinationPage({ title }) {
  return (
    <main className="destination-page">
      <h1>{title}</h1>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin" element={<DestinationPage title="Admin" />} />
        <Route path="/instructor" element={<DestinationPage title="Instructor" />} />
        <Route path="/student" element={<DestinationPage title="Student" />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
