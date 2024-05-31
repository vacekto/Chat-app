"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServerError = exports.getJWTPayload = void 0;
const getJWTPayload = (token) => {
    const tokenPayload = token.split('.')[1];
    return JSON.parse(atob(tokenPayload));
};
exports.getJWTPayload = getJWTPayload;
function isServerError(data) {
    return typeof data.errorMessage === "string";
}
exports.isServerError = isServerError;
