import { z } from 'zod'



// export const testZod = () => {
//     const UserSchema = z.object({
//         username: z.string()
//     })

//     type TUser = z.infer<typeof UserSchema>

//     const user = { username: 1 }

//     console.log(UserSchema.parse(user))

// }

// regex username: length 6 to 20, not starting with "_"" or ".", not containing "." or "_" next to each other,not ending with "_"" or ".", no special chars
// regex password: length 8 to 20, at least one uppercase letter, one lowercase letter and one number
// regex email: RFC 5322 Official Standard

const regex = {
    username: new RegExp("^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"),
    password: new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$"),
    email: new RegExp("([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|'([]!#-[^-~ \t]|(\\[\t -~]))+')@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])"),
}

export const LoginDataSchema = z.object({
    username: z.string().regex(regex.username),
    password: z.string().regex(regex.password)
})

export const RegisterDataSchema = z.object({
    username: z.string().regex(regex.username),
    password: z.string().regex(regex.password),
    email: z.string().regex(regex.email),
})