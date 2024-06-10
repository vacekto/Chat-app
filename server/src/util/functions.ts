interface IGoogleTokenResult {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    id_token: string
}

export const getGoogleOAuthTokens = async (code: string): Promise<IGoogleTokenResult> => {
    const body = {
        code,
        client_id: process.env.VITE_GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        redirect_uri: process.env.VITE_GOOGLE_OAUTH_REDIRECT_URL as string,
        grant_type: 'authorization_code'

    }
    const url = `https://oauth2.googleapis.com/token`
    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(body)
    }
    const res = await fetch(url, options)
    return res.json()
}