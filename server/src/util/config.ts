export const COOKIE_SAMESITE = "development" ? "none" : "strict"
export const CORS = [
    process.env.VITE_APP_URL as string,
    process.env.VITE_SERVER_URL as string
]

export const GoogleOAuthURL = (function () {
    const params = {
        redirect_uri: process.env.VITE_GOOGLE_OAUTH_REDIRECT_URL as string,
        client_id: process.env.VITE_GOOGLE_CLIENT_ID as string,
        access_type: "offline",
        response_type: "code",
        scope: "profile email"
    }

    const qs = new URLSearchParams(params)
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${qs.toString()}`
    return url
})()