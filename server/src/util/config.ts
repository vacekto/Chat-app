export const APP_URL = "development" ?
    `http://localhost:${process.env.PORT_CLIENT}` :
    `${process.env.VITE_SERVER_URL}`
export const COOKIE_SAMESITE = "development" ? "none" : "strict"
export const CORS = [APP_URL, process.env.PASSKEY_API_URL as string]

/**
 * Human-readable title for your website
 */
export const rpName = 'localhost';
/**
 * A unique identifier for your website. 'localhost' is okay for
 * local dev
 */
export const rpID = 'localhost';
/**
 * The URL at which registrations and authentications should occur.
 * 'http://localhost' and 'http://localhost:PORT' are also valid.
 * Do NOT include any trailing /
 */
export const origin = `http://${rpID}`;