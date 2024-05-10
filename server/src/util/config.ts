export const APP_URL = "development" ?
    `http://localhost:${process.env.PORT_CLIENT}` :
    `${process.env.VITE_SERVER_URL}`
export const COOKIE_SAMESITE = "development" ? "none" : "strict"
export const CORS = APP_URL