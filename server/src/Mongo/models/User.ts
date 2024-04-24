import mongoose, { Model } from "mongoose";
import bcrypt from 'bcrypt';
import { IUser, zodSchemas } from "@chatapp/shared";



const userSchema = new mongoose.Schema<IUser>({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        message: 'username {VALUE} is already taken',
        validate: {
            validator: function (username: string) {
                return zodSchemas.usernameZS.safeParse(username).success
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
                return zodSchemas.emailZS.safeParse(email).success
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true,
    },

}, { versionKey: false })

userSchema.pre('save', async function () {
    if (!this.password) throw new Error("password required")
    const password = this.password.trim()
    const passwordHash = await bcrypt.hash(password, 10)
    this.password = passwordHash
});

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel