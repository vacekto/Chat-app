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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("../middleware/controllers"));
const decorator_1 = require("../middleware/decorator");
const router = (0, express_1.Router)();
router.get('/healthCheck', (req, res, next) => {
    res.status(200).send('OK');
});
router.get('/test', (0, decorator_1.middlewareErrorDecorator)(controllers.test));
router.post('/refreshToken', (0, decorator_1.middlewareErrorDecorator)(controllers.refreshToken));
router.post('/logout', (0, decorator_1.middlewareErrorDecorator)(controllers.logout));
router.post('/register', (0, decorator_1.middlewareErrorDecorator)(controllers.register));
router.post('/passwordLogin', (0, decorator_1.middlewareErrorDecorator)(controllers.passwordLogin));
router.post('/passkeyLogin', (0, decorator_1.middlewareErrorDecorator)(controllers.passkeyLogin));
router.post('/createPassKey', (0, decorator_1.middlewareErrorDecorator)(controllers.createPassKey));
router.get('/OAuth', (0, decorator_1.middlewareErrorDecorator)(controllers.OAuth));
router.get('/googleLogin', (0, decorator_1.middlewareErrorDecorator)(controllers.googleLogin));
// router.get('/verify/:verificationId')
exports.default = router;
