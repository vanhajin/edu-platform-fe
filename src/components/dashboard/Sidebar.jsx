import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function Sidebar({ groups, role }) {
  const { pathname } = useLocation()
  const [openGroups, setOpenGroups] = useState(() => Object.fromEntries(groups.map((group) => [group.label, group.items.some(([to]) => pathname === to)])))
  return <aside className="sidebar">
    <div className="brand"><span className="brand-icon"><Icon name="book" /></span><span className="brand-text">Edu<span>Platform</span></span></div>
    <nav className="nav">
      {groups.map((group) => <div key={group.label}>
        {group.collapsible ? <><button type="button" className={`nav-group${openGroups[group.label] ? ' open' : ''}`} onClick={() => setOpenGroups((current) => ({ ...current, [group.label]: !current[group.label] }))}><Icon name={group.icon} /><span className="nav-label">{group.label}</span><Icon name="chevron" size={14} className="chevron" /></button><div className={`subnav${openGroups[group.label] ? ' open' : ''}`}>{group.items.map(([to, icon, label]) => <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}><Icon name={icon} /><span className="nav-label">{label}</span></NavLink>)}</div></> : <><div className="nav-caption">{group.label}</div>{group.items.map(([to, icon, label]) => <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}><Icon name={icon} /><span className="nav-label">{label}</span></NavLink>)}</>}
      </div>)}
    </nav>
    <div className="side-bottom">EduPlatform v1.0 · {role}</div>
  </aside>
}
