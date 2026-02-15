// This picks the Vercel variable in production, or defaults to local for dev
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";