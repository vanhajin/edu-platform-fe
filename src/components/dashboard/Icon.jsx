const paths = {
  home: <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
  users: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0m1-17a4 4 0 0 1 0 8m2 3a6 6 0 0 1 3 6" /></>,
  teacher: <><path d="M3 9 12 4l9 5-9 5z" /><path d="M7 12v4c3 2 7 2 10 0v-4M21 10v6" /></>,
  book: <><path d="M12 7v14m0-14C9 5 6 4 2 5v14c4-1 7 0 10 2m0-14c3-2 6-3 10-2v14c-4-1-7 0-10 2" /></>,
  layers: <><path d="m12 2 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M2 3h2l3 14h13l2-10H5" /></>,
  chart: <><path d="M4 19V5M10 19v-8M16 19V3M22 19H2" /></>,
  activity: <path d="M3 12h4l2-7 4 14 2-7h6" />,
  percent: <><path d="m9 15 6-6" /><circle cx="9" cy="9" r="1.5" /><circle cx="15" cy="15" r="1.5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5m5 5H9" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6" /><path d="M3 3v6h6M12 7v5l3 2" /></>,
  menu: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18m8-12-3 3 3 3" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10" /><path d="M10 21h4" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  reset: <path d="M3 11a9 9 0 1 0 3-6L3 8m0-5v5h5" />,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
  edit: <><path d="m15 5 4 4M4 20l4-.8L20 7a2.8 2.8 0 0 0-4-4L4 15z" /></>,
  trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m5 4v7m4-7v7" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
}

export default function Icon({ name, size = 18, className }) {
  return <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.book}</svg>
}
