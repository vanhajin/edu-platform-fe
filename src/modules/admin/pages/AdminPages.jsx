import { useEffect, useMemo, useState } from 'react'
import Icon from '../../../components/dashboard/Icon.jsx'

const names = ['Nguyễn Minh Anh', 'Trần Hải Nam', 'Lê Thu Hà', 'Phạm Gia Bảo', 'Đỗ Ngọc Linh', 'Vũ Hoàng Long']
const courses = ['Lập trình Python từ cơ bản', 'Tiếng Anh giao tiếp thực chiến', 'Thiết kế UI/UX với Figma', 'Excel cho người đi làm', 'ReactJS chuyên sâu', 'Java Spring Boot']
const data = {
  students: { title: 'Quản lý học viên', description: 'Quản lý và theo dõi học viên trên hệ thống.', columns: ['Mã học viên', 'Học viên', 'Email', 'Ngày đăng ký', 'Khóa học'], rows: Array.from({ length: 12 }, (_, i) => [`HV${String(i + 1).padStart(4, '0')}`, names[i % names.length], `hocvien${i + 1}@example.com`, `${String(i + 1).padStart(2, '0')}/10/2026`, i % 7 + 1]) },
  teachers: { title: 'Quản lý giảng viên', description: 'Quản lý hồ sơ và hoạt động của giảng viên.', columns: ['Mã giảng viên', 'Họ và tên', 'Email', 'Chuyên môn', 'Số khóa học'], rows: Array.from({ length: 10 }, (_, i) => [`GV${String(i + 1).padStart(4, '0')}`, names[(i + 2) % names.length], `giangvien${i + 1}@example.com`, ['Công nghệ thông tin', 'Ngoại ngữ', 'Thiết kế'][i % 3], i % 9 + 1]) },
  categories: { title: 'Quản lý danh mục', description: 'Quản lý các danh mục khóa học.', columns: ['Mã danh mục', 'Tên danh mục', 'Mô tả', 'Số khóa học'], rows: ['Công nghệ thông tin', 'Ngoại ngữ', 'Kỹ năng mềm', 'Thiết kế', 'Kinh doanh'].map((name, i) => [`DM${String(i + 1).padStart(4, '0')}`, name, `Các khóa học thuộc lĩnh vực ${name}`, [18, 12, 9, 7, 14][i]]) },
  courses: { title: 'Quản lý khóa học', description: 'Theo dõi và quản lý khóa học trên hệ thống.', columns: ['Mã khóa học', 'Tên khóa học', 'Giảng viên', 'Giá ban đầu', 'Giảm giá'], rows: Array.from({ length: 12 }, (_, i) => [`KH${String(i + 1).padStart(4, '0')}`, courses[i % courses.length], names[(i + 2) % names.length], `${(i % 5 + 3) * 250}.000 ₫`, `${i % 4 * 10}%`]) },
  orders: { title: 'Quản lý đơn hàng', description: 'Theo dõi và xử lý các đơn hàng trên hệ thống.', columns: ['Mã đơn hàng', 'Học viên', 'Số khóa học', 'Tổng tiền', 'Ngày đặt'], rows: Array.from({ length: 12 }, (_, i) => [`DH${String(i + 1).padStart(4, '0')}`, names[i % names.length], i % 4 + 1, `${(i % 5 + 2) * 390}.000 ₫`, `${String(i + 1).padStart(2, '0')}/10/2026`]) },
}

const adminFilterFields = {
  students: [['Mã học viên', 'Nhập mã học viên'], ['Tên học viên', 'Nhập tên học viên'], ['Email', 'Nhập email'], ['Trạng thái', null]],
  teachers: [['Mã giảng viên', 'Nhập mã giảng viên'], ['Tên giảng viên', 'Nhập tên giảng viên'], ['Chuyên môn', 'Nhập chuyên môn'], ['Trạng thái', null]],
  categories: [['Mã danh mục', 'Nhập mã danh mục'], ['Tên danh mục', 'Nhập tên danh mục'], ['Trạng thái', null]],
  courses: [['Mã khóa học', 'Nhập mã khóa học'], ['Tên khóa học', 'Nhập tên khóa học'], ['Danh mục', 'Nhập danh mục'], ['Trạng thái', null]],
  orders: [['Mã đơn hàng', 'Nhập mã đơn hàng'], ['Tên học viên', 'Nhập tên học viên'], ['Trạng thái', null]],
}

function Tag({ children }) { return <span className="pill green">{children}</span> }

function TeacherFormModal({ onClose, onSave }) {
  const [form, setForm] = useState({ username: '', email: '', name: '' })

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()
    onSave(form)
  }

  return <div className="modal-overlay show" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <form className="modal" aria-labelledby="teacher-modal-title" onSubmit={submit}>
      <div className="modal-head"><h2 id="teacher-modal-title">Thêm mới giảng viên</h2><button className="icon-btn" type="button" aria-label="Đóng popup" onClick={onClose}>×</button></div>
      <div className="modal-body modal-grid">
        <div className="field"><label htmlFor="teacher-username">Tên đăng nhập</label><input id="teacher-username" name="username" value={form.username} onChange={updateField} required autoFocus /></div>
        <div className="field"><label htmlFor="teacher-email">Email</label><input id="teacher-email" name="email" type="email" value={form.email} onChange={updateField} required /></div>
        <div className="field wide"><label htmlFor="teacher-name">Tên giảng viên</label><input id="teacher-name" name="name" value={form.name} onChange={updateField} required /></div>
      </div>
      <div className="modal-foot"><button className="btn btn-light" type="button" onClick={onClose}>Đóng</button><button className="btn btn-primary" type="submit"><Icon name="plus" /> Lưu</button></div>
    </form>
  </div>
}

export function AdminHomePage() {
  const metrics = [['Học viên mới trong tháng', '286', '12,8% so với tháng trước', 'users'], ['Khóa học mới trong tháng', '32', '8,2% so với tháng trước', 'book'], ['Giảng viên hoạt động', '128', '5,4% so với tháng trước', 'teacher'], ['Đơn hàng chờ duyệt', '18', 'Cần xử lý', 'cart']]
  return <><div className="page-head"><div><h1>Tổng quan</h1><p>Tổng hợp tình hình hoạt động của EduPlatform trong tháng 11/2026.</p></div></div><section className="admin-hero card"><div><h2>Chào mừng trở lại, Quản trị viên</h2><p>Theo dõi học viên mới, khóa học được tạo và các hoạt động quan trọng.</p></div><Icon name="book" size={54} /></section><div className="stats">{metrics.map(([label, value, note, icon]) => <div className="stat card" key={label}><div><small>{label}</small><strong>{value}</strong><em>↗ {note}</em></div><div className="stat-icon"><Icon name={icon} size={22} /></div></div>)}</div><div className="dashboard-grid"><section className="chart-card card"><h2><Icon name="chart" /> Xu hướng đăng ký học viên</h2><p>7 tháng gần nhất</p><div className="admin-bars">{[112, 135, 128, 173, 190, 221, 286].map((value, i) => <div key={value}><strong>{value}</strong><i style={{ height: `${Math.max(18, value / 2)}px` }} /><small>{['T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11'][i]}</small></div>)}</div></section><section className="chart-card card"><h2><Icon name="activity" /> Hoạt động gần đây</h2><p>Các hoạt động mới nhất trên hệ thống</p>{['12 học viên mới đăng ký hôm nay', '3 hồ sơ giảng viên chờ duyệt', '5 đơn hàng đang chờ xử lý', '2 khóa học mới được tạo'].map((item) => <div className="listline" key={item}><span>{item}</span><Tag>Mới</Tag></div>)}</section></div></>
}

export function AdminTablePage({ kind }) {
  const config = data[kind]
  const filterFields = adminFilterFields[kind]
  const [query, setQuery] = useState('')
  const [createdTeachers, setCreatedTeachers] = useState([])
  const [teacherModalOpen, setTeacherModalOpen] = useState(false)
  const sourceRows = useMemo(() => kind === 'teachers' ? [...createdTeachers, ...config.rows] : config.rows, [kind, config.rows, createdTeachers])
  const rows = useMemo(() => sourceRows.filter((row) => row.join(' ').toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi'))), [sourceRows, query])

  function addTeacher(teacher) {
    const id = `GV${String(config.rows.length + createdTeachers.length + 1).padStart(4, '0')}`
    setCreatedTeachers((current) => [[id, teacher.name, teacher.email, 'Chưa cập nhật', 0, 'Hoạt động'], ...current])
    setTeacherModalOpen(false)
  }

  return <>
    <div className="page-head"><div><h1>{config.title}</h1><p>{config.description}</p></div>{kind === 'teachers' && <button className="btn btn-primary" onClick={() => setTeacherModalOpen(true)}><Icon name="plus" /> Thêm mới</button>}</div>
    <div className="card filter-card"><div className="filter-grid role-filter-grid">{filterFields.map(([label, placeholder], index) => <div className="field" key={label}><label>{label}</label>{placeholder ? <input value={index === 0 ? query : undefined} onChange={index === 0 ? (event) => setQuery(event.target.value) : undefined} placeholder={placeholder} /> : <select><option>Tất cả trạng thái</option><option>Hoạt động</option><option>Chờ duyệt</option><option>Đã khóa</option></select>}</div>)}<div className="filter-actions"><button className="btn btn-primary"><Icon name="search" /> Tìm kiếm</button><button className="btn btn-light" onClick={() => setQuery('')}><Icon name="reset" /> Làm mới</button></div></div></div>
    <div className="card table-card"><div className="table-heading"><h2>{config.title} <span className="pill gray">{rows.length} bản ghi</span></h2></div><div className="table-scroll"><table><thead><tr><th>STT</th>{config.columns.map((column) => <th key={column}>{column}</th>)}<th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]}><td>{index + 1}</td>{row.map((cell, cellIndex) => <td key={`${row[0]}-${cellIndex}`}><strong>{String(cell).startsWith('HV') || String(cell).startsWith('GV') || String(cell).startsWith('KH') || String(cell).startsWith('DM') || String(cell).startsWith('DH') ? cell : undefined}</strong>{!String(cell).match(/^(HV|GV|KH|DM|DH)/) && cell}</td>)}<td><Tag>{kind === 'teachers' && row[5] ? row[5] : kind === 'teachers' && index % 4 === 0 ? 'Chờ duyệt' : 'Hoạt động'}</Tag></td><td><div className="actions"><button className="act view" aria-label="Xem chi tiết"><Icon name="eye" size={16} /></button><button className="act edit" aria-label="Chỉnh sửa"><Icon name="edit" size={16} /></button><button className="act delete" aria-label="Xóa"><Icon name="trash" size={16} /></button></div></td></tr>)}</tbody></table></div><div className="pagination"><span>Hiển thị {rows.length} / {sourceRows.length} kết quả</span><div className="pages"><button className="current">1</button><button>2</button><button>→</button></div></div></div>
    {teacherModalOpen && <TeacherFormModal onClose={() => setTeacherModalOpen(false)} onSave={addTeacher} />}
  </>
}

export function AdminReportPage({ revenue = false }) { return <><div className="page-head"><div><h1>{revenue ? 'Thống kê doanh thu' : 'Thống kê vận hành'}</h1><p>{revenue ? 'Theo dõi doanh thu và hiệu quả kinh doanh theo thời gian.' : 'Nắm bắt tăng trưởng người dùng và hoạt động khóa học.'}</p></div></div><div className="card filter-card"><div className="filter-grid"><div className="field"><label>Chu kỳ báo cáo</label><select><option>Theo tháng</option><option>Theo tuần</option><option>Theo ngày</option><option>Theo năm</option></select></div><div className="field"><label>Năm</label><select><option>2026</option><option>2025</option></select></div><button className="btn btn-primary"><Icon name="search" /> Xem báo cáo</button></div></div><div className="stats">{(revenue ? [['Doanh thu kỳ này', '284.500.000 ₫'], ['Đơn hàng thành công', '342'], ['Giá trị đơn trung bình', '832.000 ₫'], ['Tỷ lệ tăng trưởng', '+14,5%']] : [['Học viên mới', '286'], ['Khóa học mới', '32'], ['Giảng viên mới', '18'], ['Tổng học viên', '3.842']]).map(([label, value]) => <div className="stat card" key={label}><div><small>{label}</small><strong>{value}</strong><em>↗ Tăng trưởng tích cực</em></div></div>)}</div><section className="chart-card card"><h2><Icon name="chart" /> {revenue ? 'Doanh thu theo tháng' : 'Đăng ký mới theo tháng'}</h2><p>Dữ liệu minh họa theo kỳ đã chọn</p><div className="admin-bars report-bars">{[42, 58, 55, 74, 69, 82, 96, 113, 129, 146, 173, 198].map((value, i) => <div key={i}><strong>{value}</strong><i style={{ height: `${value}px` }} /><small>T{i + 1}</small></div>)}</div></section></> }
