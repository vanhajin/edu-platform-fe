import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage, RegisterPage, ResetPasswordPage } from './modules/auth/index.js'
import './modules/auth/styles/auth.css'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import { AdminHomePage, AdminReportPage, AdminTablePage } from './modules/admin/pages/AdminPages.jsx'
import { InstructorHomePage, InstructorCoursesPage, InstructorDiscountsPage, InstructorProfilePage } from './modules/instructor/pages/InstructorPages.jsx'
import { StudentHomePage, StudentCataloguePage, StudentDetailPage, StudentOrderPage, StudentProfilePage } from './modules/student/pages/StudentPages.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/students" element={<AdminTablePage kind="students" />} />
          <Route path="/admin/teachers" element={<AdminTablePage kind="teachers" />} />
          <Route path="/admin/categories" element={<AdminTablePage kind="categories" />} />
          <Route path="/admin/courses" element={<AdminTablePage kind="courses" />} />
          <Route path="/admin/orders" element={<AdminTablePage kind="orders" />} />
          <Route path="/admin/revenue" element={<AdminReportPage revenue />} />
          <Route path="/admin/operations" element={<AdminReportPage />} />
          <Route path="/instructor" element={<InstructorHomePage />} />
          <Route path="/instructor/courses" element={<InstructorCoursesPage />} />
          <Route path="/instructor/discounts" element={<InstructorDiscountsPage />} />
          <Route path="/instructor/profile" element={<InstructorProfilePage />} />
          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/student/courses" element={<StudentCataloguePage />} />
          <Route path="/student/courses/:id" element={<StudentDetailPage />} />
          <Route path="/student/my-courses" element={<StudentCataloguePage owned />} />
          <Route path="/student/purchase-history" element={<StudentOrderPage title="Lịch sử mua hàng" />} />
          <Route path="/student/cart" element={<StudentOrderPage title="Giỏ hàng" action="Xóa khỏi giỏ" />} />
          <Route path="/student/checkout" element={<StudentOrderPage title="Thanh toán" action="Xác nhận" />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
