import { z } from 'zod';
export declare const emailZS: z.ZodString;
export declare const usernameZS: z.ZodString;
export declare const passwordZS: z.ZodString;
export declare const loginFormZS: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const registerFormZS: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    repeatPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
    repeatPassword: string;
}, {
    username: string;
    password: string;
    email: string;
    repeatPassword: string;
}>, {
    username: string;
    password: string;
    email: string;
    repeatPassword: string;
}, {
    username: string;
    password: string;
    email: string;
    repeatPassword: string;
}>;
export declare const tokenPayloadZS: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    id: string;
}, {
    username: string;
    email: string;
    id: string;
}>;
export declare const registerApiZS: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
}, {
    username: string;
    password: string;
    email: string;
}>;
export declare const loginApiZS: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
