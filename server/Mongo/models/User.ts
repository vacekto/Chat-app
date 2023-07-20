import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser {
    username: string
    email: string
    verified: boolean
    password: string
    verificationId?: string
    createdAt?: Date
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reqired: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: () => false,
    },

    verificationId: String,

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
})

userSchema.pre('save', async function () {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(this.password, saltRounds)
    this.password = passwordHash
});

const UserModel = mongoose.model<IUser>("User", userSchema)



export default UserModel