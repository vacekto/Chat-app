"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginApiZS = exports.registerApiZS = exports.tokenPayloadZS = exports.registerFormZS = exports.loginFormZS = exports.passwordZS = exports.usernameZS = exports.emailZS = void 0;
const zod_1 = require("zod");
// ZS === ZodSchema
exports.emailZS = zod_1.z.string().trim().email('Invalid email');
exports.usernameZS = zod_1.z.string().trim()
    .min(6, 'Username must contain at least 6 characters')
    .max(20, 'Username must contain at most 20 characters')
    .regex(/^[^_].*[^_]$/, 'Username cannot start or end with "_" character')
    .regex(/^[^.].*[^.]$/, 'Username cannot start or end with "." character')
    .regex(/^(?!.*[_.]{2})/, 'Username cannot contain characters "." and "_" next to each other')
    .regex(/^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/, 'Special characters are not allowed');
exports.passwordZS = zod_1.z.string().trim()
    .min(8, 'Password must contain at least 8 characters')
    .max(20, 'Password must contain at most 20 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase')
    .regex(/[a-z]/, 'Password must contain at least one lowercase')
    .regex(/[0-9]/, 'Password must contain at least one number');
exports.loginFormZS = zod_1.z.object({
    username: exports.usernameZS,
    password: exports.passwordZS
});
exports.registerFormZS = zod_1.z.object({
    username: exports.usernameZS,
    email: exports.emailZS,
    password: exports.passwordZS,
    repeatPassword: zod_1.z.string()
}).refine(data => data.password === data.repeatPassword, {
    message: "Password must equel RepeatPassword",
    path: ["repeatPassword"]
});
exports.tokenPayloadZS = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string(),
    id: zod_1.z.string()
});
exports.registerApiZS = zod_1.z.object({
    username: exports.usernameZS,
    email: exports.emailZS,
    password: zod_1.z.string(),
});
exports.loginApiZS = zod_1.z.object({
    username: exports.usernameZS,
    password: zod_1.z.string()
});
// export const createPasskeyApiZS = z.object({
//     username: usernameZS,
//     password: z.string()
// })
