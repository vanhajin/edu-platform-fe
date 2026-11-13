import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function Header({ title, account, onToggle }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function closeMenu(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false)
    }
    function closeOnEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', closeMenu)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeMenu)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('auth_user')
    navigate('/login')
  }

  return <header className="topbar"><div className="top-left"><button className="icon-btn" onClick={onToggle} aria-label="Thu gọn hoặc mở rộng menu"><Icon name="menu" /></button><span className="crumb">EduPlatform / <b>{title}</b></span></div><div className="top-actions">{account.cartTo ? <Link className="icon-btn" to={account.cartTo} aria-label="Giỏ hàng"><Icon name="cart" /></Link> : <button className="icon-btn" aria-label="Thông báo"><Icon name="bell" /></button>}<div className="account-menu" ref={menuRef}><button className="user-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu"><span className="avatar">{account.initials}</span><span className="user-text"><strong>{account.name}</strong><small>{account.label}</small></span><Icon name="chevron" size={14} /></button><div className={`profile-menu${open ? ' show' : ''}`} role="menu"><Link to={account.profileTo} role="menuitem" onClick={() => setOpen(false)}><Icon name="user" /> Hồ sơ cá nhân</Link><button type="button" role="menuitem" onClick={logout}><Icon name="logout" /> Đăng xuất</button></div></div></div></header>
}
