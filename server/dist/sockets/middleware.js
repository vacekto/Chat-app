"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shared_1 = require("@chatapp/shared");
const auth = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        jsonwebtoken_1.default.verify(token, process.env.AUTH_TOKEN_SECRET);
        const payload = (0, shared_1.getJWTPayload)(token);
        const userData = shared_1.zodSchemas.tokenPayloadZS.parse(payload);
        socket.data.username = userData.username;
        next();
    }
    catch (err) {
        // should log error in prod
        next(err);
    }
};
exports.auth = auth;
