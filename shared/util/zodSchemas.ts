import { z } from 'zod'

export const emailZodSchema = z.string().trim().email('Invalid email')

export const usernameZodSchema = z.string().trim()
    .min(6, 'Username must contain at least 6 characters')
    .max(20, 'Username must contain at most 20 characters')
    .regex(/^[^_].*[^_]$/, 'Username cannot start or end with "_" character')
    .regex(/^[^.].*[^.]$/, 'Username cannot start or end with "." character')
    .regex(/^(?!.*[_.]{2})/, 'Username cannot contain characters "." and "_" next to each other')
    .regex(/^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/, 'Special characters are not allowed')

export const passwordZodSchema = z.string().trim()
    .min(8, 'Password must contain at least 8 characters')
    .max(20, 'Password must contain at most 20 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase')
    .regex(/[a-z]/, 'Password must contain at least one lowercase')
    .regex(/[0-9]/, 'Password must contain at least one number')

export const loginDataZodSchema = z.object({
    username: usernameZodSchema,
    password: passwordZodSchema
})

export const registerDataZodSchema = z.object({
    username: usernameZodSchema,
    password: passwordZodSchema,
    email: emailZodSchema
})

export const TokenPayloadZodSchema = z.object({
    username: z.string().trim(),
    email: z.string().trim()
})