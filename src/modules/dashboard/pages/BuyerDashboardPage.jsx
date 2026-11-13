import { Link } from 'react-router-dom'

const stats = [['Khóa học đang học', '12', '+2 tháng này', '📘'], ['Tổng khóa học', '36', '+8% so với tháng trước', '🎓'], ['Giờ học tích lũy', '48h', '+12% tuần này', '◷'], ['Hoàn thành', '68%', '+5% so với tháng trước', '✓']]
const popular = [['Lập trình React từ A-Z', 'Nguyễn Văn Minh', '89%', 'course-0.svg'], ['UI/UX Design thực chiến', 'Trần Thị Lan', '72%', 'course-1.svg'], ['Java Spring Boot', 'Lê Hoàng Nam', '56%', 'course-2.svg']]

export default function BuyerDashboardPage() {
  return <><div className="hero"><div className="hero-copy"><h1>Học điều mới mỗi ngày</h1><p>Khám phá các khóa học chất lượng và phát triển kỹ năng của bạn cùng EduPlatform.</p><Link className="btn" to="/student/courses">Khám phá khóa học →</Link></div><img src="/assets/teaching.svg" alt="Học tập" /></div>
    <div className="stats">{stats.map(([label, value, note, icon]) => <div className="stat card" key={label}><div><small>{label}</small><strong>{value}</strong><em>{note}</em></div><div className="stat-icon">{icon}</div></div>)}</div>
    <div className="dashboard-grid"><section className="chart-card card"><h2>Tiến độ học tập</h2><p>Theo dõi tiến độ các khóa học đang học</p>{popular.map(([name, author, progress]) => <div className="bar-item" key={name}><div className="bar-meta"><strong>{name}</strong><span>{progress}</span></div><div className="track"><div className="fill" style={{ width: progress }} /></div><small>{author}</small></div>)}</section><section className="chart-card card"><h2>Khóa học phổ biến</h2><p>Những khóa học được yêu thích nhất</p>{popular.map(([name, author, _progress, image]) => <Link className="course-row" to="/student/courses/KH0001" key={name}><img src={`/assets/${image}`} alt="" /><span><strong>{name}</strong><small>{author}</small></span><b>→</b></Link>)}</section></div></>
}
