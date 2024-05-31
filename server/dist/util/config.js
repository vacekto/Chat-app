"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS = exports.COOKIE_SAMESITE = void 0;
exports.COOKIE_SAMESITE = "development" ? "none" : "strict";
exports.CORS = [
    process.env.VITE_APP_URL,
    process.env.VITE_SERVER_URL
];
