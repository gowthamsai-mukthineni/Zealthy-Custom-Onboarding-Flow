const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'
export const api = (path, opts = {}) =>
  fetch(API + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
