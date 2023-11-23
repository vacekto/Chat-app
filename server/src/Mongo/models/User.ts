import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import uniqueValidator from 'mongoose-unique-validator'

// verification id is used for email verification, in '/verify:verificationId' router path
export interface IUser {
    username: string
    email: string
    verified: boolean
    password: string
    verificationId: string
    createdAt: Date
}

const userSchema = new mongoose.Schema<IUser>({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        message: 'username {VALUE} is already taken',
    },

    email: {
        type: String,
        reqired: true,
        unique: true,
        trim: true,
    },

    verified: {
        type: Boolean,
        default: false,
    },

    verificationId: {
        type: String,
        default: uuidv4()
    },

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

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function () {
    const saltRounds = 10;
    const password = this.password.trim()
    const passwordHash = await bcrypt.hash(password, saltRounds)
    this.password = passwordHash
});

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel