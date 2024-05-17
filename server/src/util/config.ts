export const COOKIE_SAMESITE = "development" ? "none" : "strict"
export const CORS = [
    process.env.VITE_APP_URL as string,
    process.env.VITE_SERVER_URL as string
]