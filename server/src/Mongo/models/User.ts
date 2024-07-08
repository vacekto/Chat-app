import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { zodSchemas } from "@chatapp/shared";
import { v4 as uuidv4 } from 'uuid';
import { IUserDB } from "../../types";

const userSchema = new mongoose.Schema<IUserDB>({

    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

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
            validator: (email: string) => (
                zodSchemas.emailZS.safeParse(email).success
            ),
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    directChannelsIds: [{
        type: String,
        trim: true
    }],

    groupChannelsIds: [{
        type: String,
        trim: true
    }],
})

userSchema.pre('validate', function () {
    this.id = uuidv4()
});

userSchema.pre('save', async function () {
    this.groupChannelsIds = ["1"]
    if (!this.password) throw new Error("password required")
    this.password = await bcrypt.hash(this.password.trim(), 10)
});


const User = mongoose.model<IUserDB>("User", userSchema)

export default User