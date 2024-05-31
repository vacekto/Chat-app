"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleOAuthURL = exports.getGoogleOAuthTokens = void 0;
const getGoogleOAuthTokens = async (code) => {
    const body = {
        code,
        client_id: process.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code'
    };
    const url = `https://oauth2.googleapis.com/token`;
    const options = {
        method: "POST",
        body: JSON.stringify(body)
    };
    const res = await fetch(url, options);
    return res.json();
};
exports.getGoogleOAuthTokens = getGoogleOAuthTokens;
const getGoogleOAuthURL = () => {
    const params = {
        redirect_uri: process.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
        client_id: process.env.VITE_GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        scope: "profile email"
    };
    const qs = new URLSearchParams(params);
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${qs.toString()}`;
    return url;
};
exports.getGoogleOAuthURL = getGoogleOAuthURL;
