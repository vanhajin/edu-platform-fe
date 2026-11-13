# Role Static Screens Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Chuyển các màn hình tĩnh trong `web HTML` vào React/Vite project `eduplatform-fe`, giữ nguyên cụm auth, dùng dashboard buyer và sidebar/header seller.

**Architecture:** Giữ `modules/auth` độc lập. Tạo `layouts/DashboardLayout` và component UI dùng chung; tổ chức page theo nghiệp vụ trong `modules`, còn route/menu được phân theo role. Dữ liệu giai đoạn đầu là demo local/static, không thay đổi API auth hiện tại.

**Tech Stack:** React 19, React Router 7, Vite, CSS hiện có và CSS chuyển đổi từ mockup.

**Spec:** Người dùng yêu cầu chuyển các màn tĩnh từ `D:\VanNT_Shared\vannt shop\web HTML` vào `D:\VanNT_Shared\vannt shop\eduplatform-fe`, trừ cụm login; dashboard lấy của buyer; sidebar lấy giao diện seller.

## Global Constraints

- Không sửa hoặc xóa luồng `/login`, `/register`, `/reset-password`.
- Không thêm xác thực giả làm thay đổi auth hiện tại.
- Các thao tác CRUD/thanh toán trong mockup chỉ mô phỏng ở frontend.
- Route role phải có thể truy cập trực tiếp trong React Router.
- Layout dashboard dùng sidebar/header seller; nội dung dashboard dùng bố cục buyer.

## Review Focus

- Refresh trực tiếp tại route con phải không làm app crash.
- Link giữa các màn buyer/admin/seller không được quay về auth ngoài ý muốn.
- CSS của dashboard không làm thay đổi giao diện auth.
- Menu seller phải hiển thị đúng cho dashboard buyer và active state phải ổn định.
- Build production phải hoàn tất không lỗi.

### Task 1: Dashboard shell and shared navigation

**Files:**
- Create: `src/layouts/DashboardLayout.jsx`, `src/layouts/dashboard.css`
- Create: `src/components/dashboard/Sidebar.jsx`, `src/components/dashboard/Header.jsx`
- Modify: `src/App.jsx`, `src/index.css`

- [ ] Add dashboard shell with seller-style dark collapsible sidebar/header and role-aware menu.
- [ ] Route dashboard pages through the shared shell without changing auth routes.
- [ ] Verify the app renders dashboard shell at the selected routes.

### Task 2: Buyer dashboard and buyer screens

**Files:**
- Create: `src/modules/dashboard/pages/BuyerDashboardPage.jsx`
- Create: `src/modules/buyer/pages/{CourseDetailPage,MyCoursesPage,PurchaseHistoryPage,CartPage,CheckoutPage,BuyerProfilePage}.jsx`
- Create: `src/modules/buyer/styles/buyer.css`
- Copy/adapt: buyer SVG/image assets into `src/assets/buyer/`

- [ ] Recreate buyer dashboard visual hierarchy and demo cards from `role-buyer/home.html`.
- [ ] Add buyer routes and functional local interactions for navigation, cart selection and checkout success state.
- [ ] Add remaining buyer pages as working static/demo screens.

### Task 3: Seller and admin screens

**Files:**
- Create: `src/modules/seller/pages/{SellerDashboardPage,SellerCoursesPage,DiscountsPage,SellerProfilePage}.jsx`
- Create: `src/modules/admin/pages/{AdminDashboardPage,StudentsPage,TeachersPage,CategoriesPage,AdminCoursesPage,OrdersPage,RevenuePage,OperationsPage}.jsx`
- Create: `src/modules/roles/styles/role-pages.css`

- [ ] Recreate seller pages and admin pages as routeable demo screens using shared shell and reusable tables/cards.
- [ ] Preserve role-specific menu items while using the seller visual shell.
- [ ] Add basic search/filter/pagination affordances where present in static mockups.

### Task 4: Verification

- [ ] Run `npm test` from `eduplatform-fe`.
- [ ] Run `npm run build` from `eduplatform-fe`.
- [ ] Run `npm run lint` from `eduplatform-fe` and record any pre-existing issues separately.
- [ ] Inspect git diff and verify auth files were not modified unnecessarily.
