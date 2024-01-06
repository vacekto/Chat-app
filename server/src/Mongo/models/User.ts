import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { IUser, usernameZodSchema, emailZodSchema, passwordZodSchema } from "@chatapp/shared";


const userSchema = new mongoose.Schema<IUser & { password: string, }>({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        message: 'username {VALUE} is already taken',
        validate: {
            validator: function (username: string) {
                return usernameZodSchema.safeParse(username).success
            },
            message: props => `${props.value} is not a valid username!`
        }
    },

    email: {
        type: String,
        reqired: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (email: string) {
                return emailZodSchema.safeParse(email).success
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: function (password: string) {
                return passwordZodSchema.safeParse(password).success
            },
            message: `invalid password!`
        }
    },

}, { versionKey: false })

userSchema.pre('save', async function () {
    const password = this.password.trim()
    const passwordHash = await bcrypt.hash(password, 10)
    this.password = passwordHash
});

const UserModel = mongoose.model<IUser & { password: string }>("User", userSchema)

export default UserModel