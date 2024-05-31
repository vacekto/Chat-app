import { z } from 'zod'

// ZS === ZodSchema
export const emailZS = z.string().trim().email('Invalid email')

export const usernameZS = z.string().trim()
    .min(6, 'Username must contain at least 6 characters')
    .max(20, 'Username must contain at most 20 characters')
    .regex(/^[^_].*[^_]$/, 'Username cannot start or end with "_" character')
    .regex(/^[^.].*[^.]$/, 'Username cannot start or end with "." character')
    .regex(/^(?!.*[_.]{2})/, 'Username cannot contain characters "." and "_" next to each other')
    .regex(/^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/, 'Special characters are not allowed')

export const passwordZS = z.string().trim()
    .min(8, 'Password must contain at least 8 characters')
    .max(20, 'Password must contain at most 20 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase')
    .regex(/[a-z]/, 'Password must contain at least one lowercase')
    .regex(/[0-9]/, 'Password must contain at least one number')

export const loginFormZS = z.object({
    username: usernameZS,
    password: passwordZS
})

export const registerFormZS = z.object({
    username: usernameZS,
    email: emailZS,
    password: passwordZS,
    repeatPassword: z.string()
}).refine(data => data.password === data.repeatPassword, {
    message: "Password must equel RepeatPassword",
    path: ["repeatPassword"]
})

export const tokenPayloadZS = z.object({
    username: z.string(),
    email: z.string(),
    id: z.string()
})

export const registerApiZS = z.object({
    username: usernameZS,
    email: emailZS,
    password: z.string(),
})

export const loginApiZS = z.object({
    username: usernameZS,
    password: z.string()
})

// export const createPasskeyApiZS = z.object({
//     username: usernameZS,
//     password: z.string()
// })


