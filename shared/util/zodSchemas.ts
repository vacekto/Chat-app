import { z } from 'zod'
import { regex } from './regex'



export const loginDataSchema = z.object({
    username: z.string().regex(regex.username),
    password: z.string().regex(regex.password)
})

export const registerDataSchema = z.object({
    username: z.string().regex(regex.username),
    password: z.string().regex(regex.password),
    email: z.string().regex(regex.email),
})
    
    
    // export const testZod = () => {
    //     const UserSchema = z.object({
    //         username: z.string()
    //     })
    
    //     type TUser = z.infer<typeof UserSchema>
    
    //     const user = { username: 1 }
    
    //     console.log(UserSchema.parse(user))
    
    // }