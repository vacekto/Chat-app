"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.test = exports.OAuth = exports.logout = exports.refreshToken = exports.passwordLogin = exports.register = exports.passkeyLogin = exports.createPassKey = void 0;
const MongoAPI = __importStar(require("../Mongo/API"));
const shared_1 = require("@chatapp/shared");
const BadUserInput_1 = __importDefault(require("../util/errorClasses/BadUserInput"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_1 = require("../Redis/connect");
const shared_2 = require("@chatapp/shared");
const config_1 = require("../util/config");
const functions_1 = require("../util/functions");
const createPassKey = async (req, res) => {
    const { JWT } = req.body;
    jsonwebtoken_1.default.verify(JWT, process.env.AUTH_TOKEN_SECRET);
    const { username, id } = (0, shared_1.getJWTPayload)(JWT);
    const passkeyPayload = {
        userId: id,
        username: username
    };
    const url = `${process.env.PASSKEY_API_URL}/register/token`;
    const options = {
        method: 'POST',
        body: JSON.stringify(passkeyPayload),
        headers: {
            'ApiSecret': `${process.env.PASSKEY_PRIVATE_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(url, options);
    const { token } = await response.json();
    res.send({ registerToken: token });
};
exports.createPassKey = createPassKey;
const passkeyLogin = async (req, res) => {
    const token = req.body.token;
    const url = `${process.env.PASSKEY_API_URL}/signin/verify`;
    const options = {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
            'ApiSecret': process.env.PASSKEY_PRIVATE_KEY,
            'Content-Type': 'application/json'
        }
    };
    const verifyResponse = await fetch(url, options);
    const body = await verifyResponse.json();
    if (!body.success)
        throw new Error("some passkey login error");
    const user = await MongoAPI.getUserLean({ id: body.userId });
    if (!user)
        throw new Error("some passkey login error");
    const payload = {
        email: user.email,
        id: user.id,
        username: user.username,
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: shared_2.JWT_ACCESS_VALIDATION_LENGTH });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: shared_2.JWT_REFRESH_VALIDATION_LENGTH });
    res.cookie(shared_1.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        sameSite: config_1.COOKIE_SAMESITE,
        maxAge: shared_2.JWT_REFRESH_VALIDATION_LENGTH * 1000
    });
    await connect_1.redisClient.set(user.username, refreshToken);
    const response = {
        username: user.username,
        email: user.email,
        jwt: accessToken,
        id: user.id,
    };
    res.send(response);
};
exports.passkeyLogin = passkeyLogin;
const register = async (req, res, next) => {
    const registerData = shared_1.zodSchemas.registerApiZS.parse(req.body);
    const user = await MongoAPI.createUser(registerData);
    const response = {
        username: user.username,
        email: user.email,
        id: user.id,
    };
    res.send(response);
};
exports.register = register;
const passwordLogin = async (req, res) => {
    const loginData = shared_1.zodSchemas.loginApiZS.parse(req.body);
    const user = await MongoAPI.getUser({ username: loginData.username });
    if (!user)
        throw new BadUserInput_1.default(`User with username ${loginData.username} does not exist.`);
    const isMatch = await bcrypt_1.default.compare(loginData.password, user.password);
    if (!isMatch)
        throw new BadUserInput_1.default('Incorrect password');
    const payload = {
        username: user.username,
        email: user.email,
        id: user.id
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: shared_2.JWT_ACCESS_VALIDATION_LENGTH });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: shared_2.JWT_REFRESH_VALIDATION_LENGTH });
    res.cookie(shared_1.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        sameSite: config_1.COOKIE_SAMESITE,
        maxAge: shared_2.JWT_REFRESH_VALIDATION_LENGTH * 1000
    });
    await connect_1.redisClient.set(user.username, refreshToken);
    const response = {
        username: user.username,
        email: user.email,
        jwt: accessToken,
        id: user.id,
    };
    res.send(response);
};
exports.passwordLogin = passwordLogin;
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies[shared_1.REFRESH_TOKEN];
    if (!refreshToken) {
        res.status(400).send("no refresh token");
        return;
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.AUTH_TOKEN_SECRET);
    let payload = (0, shared_1.getJWTPayload)(refreshToken);
    payload = {
        username: payload.username,
        email: payload.email,
        id: payload.id
    };
    const redisRefreshToken = await connect_1.redisClient.get(payload.username);
    if (refreshToken !== redisRefreshToken) {
        res.clearCookie(shared_1.REFRESH_TOKEN);
        res.redirect('back');
        return;
    }
    const newAccessToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: shared_2.JWT_ACCESS_VALIDATION_LENGTH });
    const newRefreshToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: shared_2.JWT_REFRESH_VALIDATION_LENGTH });
    res.cookie(shared_1.REFRESH_TOKEN, newRefreshToken, {
        httpOnly: true,
        sameSite: config_1.COOKIE_SAMESITE,
        maxAge: shared_2.JWT_REFRESH_VALIDATION_LENGTH * 1000
    });
    await connect_1.redisClient.set(payload.username, newRefreshToken);
    res.send({ JWT: newAccessToken });
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
    const token = req.cookies[shared_1.REFRESH_TOKEN];
    const paylaod = (0, shared_1.getJWTPayload)(token);
    res.clearCookie(shared_1.REFRESH_TOKEN);
    await connect_1.redisClient.del(paylaod.username);
    res.status(200).send(paylaod);
};
exports.logout = logout;
const OAuth = async (req, res) => {
    const code = req.query.code;
    const { access_token, id_token } = await (0, functions_1.getGoogleOAuthTokens)(code);
    const OAuthPayloadayload = (0, shared_1.getJWTPayload)(id_token);
    const user = await MongoAPI.getUserLean({ email: OAuthPayloadayload.email });
    const redirectUrl = process.env.NODE_ENV === "development" ?
        process.env.VITE_APP_URL :
        process.env.VITE_SERVER_URL;
    if (!user) {
        res.redirect(`${redirectUrl}/notRegistered`);
        return;
    }
    const payload = {
        email: user.email,
        id: user.id,
        username: user.username
    };
    const newRefreshToken = jsonwebtoken_1.default.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: shared_2.JWT_REFRESH_VALIDATION_LENGTH });
    res.cookie(shared_1.REFRESH_TOKEN, newRefreshToken, {
        httpOnly: true,
        sameSite: config_1.COOKIE_SAMESITE,
        maxAge: shared_2.JWT_REFRESH_VALIDATION_LENGTH * 1000
    });
    await connect_1.redisClient.set(payload.username, newRefreshToken);
    res.redirect(redirectUrl);
};
exports.OAuth = OAuth;
const test = async (req, res, next) => {
    res.cookie("testing", "testing", {
        httpOnly: true,
        sameSite: config_1.COOKIE_SAMESITE,
        maxAge: shared_2.JWT_REFRESH_VALIDATION_LENGTH * 1000
    });
    res.redirect("back");
};
exports.test = test;
const googleLogin = async (req, res, next) => {
    const url = (0, functions_1.getGoogleOAuthURL)();
    res.redirect(url);
};
exports.googleLogin = googleLogin;
