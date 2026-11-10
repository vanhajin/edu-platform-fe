import { Link } from 'react-router-dom'

export default function AuthLayout({ children, title, description, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-logo">
          <h1>
            Edu<span>Platform</span>
          </h1>
        </div>

        {title && <h2 className="screen-title">{title}</h2>}
        {description && <p className="screen-desc">{description}</p>}
        {children}
        {footer && <div className="footer-text">{footer}</div>}
      </section>
    </main>
  )
}

export function AuthLink({ to, children, className = '' }) {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  )
}
