export const roleDashboardConfig = {
  admin: {
    account: { name: 'Quản trị viên', initials: 'AD', label: 'Administrator', profileTo: '/admin' },
    groups: [
      { label: 'TỔNG QUAN', items: [['/admin', 'home', 'Tổng quan']] },
      { label: 'QUẢN LÝ THÀNH VIÊN', icon: 'users', collapsible: true, items: [['/admin/students', 'users', 'Quản lý học viên'], ['/admin/teachers', 'teacher', 'Quản lý giảng viên']] },
      { label: 'HỆ THỐNG KHÓA HỌC', icon: 'book', collapsible: true, items: [['/admin/categories', 'layers', 'Quản lý danh mục'], ['/admin/courses', 'book', 'Quản lý khóa học']] },
      { label: 'NGHIỆP VỤ BÁN HÀNG', icon: 'cart', collapsible: true, items: [['/admin/orders', 'cart', 'Quản lý đơn hàng']] },
      { label: 'THỐNG KÊ & BÁO CÁO', icon: 'chart', collapsible: true, items: [['/admin/revenue', 'chart', 'Thống kê doanh thu'], ['/admin/operations', 'activity', 'Thống kê vận hành']] },
    ],
  },
  instructor: {
    account: { name: 'Nguyễn Minh Anh', initials: 'NM', label: 'Giảng viên', profileTo: '/instructor/profile' },
    groups: [
      { label: 'BẢNG ĐIỀU KHIỂN', items: [['/instructor', 'home', 'Home']] },
      { label: 'QUẢN LÝ', icon: 'book', collapsible: true, items: [['/instructor/courses', 'book', 'Danh sách khóa học'], ['/instructor/discounts', 'percent', 'Quản lý giảm giá']] },
    ],
  },
  student: {
    account: { name: 'Hoàng Minh Anh', initials: 'HA', label: 'Học viên', profileTo: '/student/profile', cartTo: '/student/cart' },
    groups: [
      { label: 'KHÔNG GIAN HỌC TẬP', items: [['/student', 'home', 'Trang chủ']] },
      { label: 'Học tập của tôi', icon: 'teacher', collapsible: true, items: [['/student/my-courses', 'book', 'Khóa học của tôi'], ['/student/purchase-history', 'history', 'Lịch sử mua hàng']] },
    ],
  },
}
