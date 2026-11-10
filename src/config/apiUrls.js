export const apiUrls = {
  auth: import.meta.env.VITE_AUTH_URL,
  register: import.meta.env.VITE_REGISTER_URL,
  category: import.meta.env.VITE_CATEGORY_URL,
  course: import.meta.env.VITE_COURSE_URL,
  order: import.meta.env.VITE_ORDER_URL,
}

export function requireApiUrl(name) {
  const url = apiUrls[name]

  if (!url) {
    throw new Error(`Thiếu cấu hình URL cho service: ${name}`)
  }

  return url
}
