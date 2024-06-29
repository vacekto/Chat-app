import mongoose, { Schema } from "mongoose";
import { IDirectChannel, IMessage } from "@chatapp/shared";
import { v4 as uuidv4 } from 'uuid';
import User from "./User";
import { TMongoDoc, TMongoLean } from "src/types";


type TDirectChannelDB = Omit<IDirectChannel, "messages"> & {
    messages: TMongoDoc<IMessage>[] | TMongoLean<IMessage>[] | Schema.Types.ObjectId[]
}

const directChannelSchema = new mongoose.Schema<TDirectChannelDB>({

    id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],

    users: {
        type: [String, String],
        validate: {
            validator: (users: any) => (
                users instanceof Array &&
                users.length === 2 &&
                typeof users[0] === "string" &&
                typeof users[1] === "string"
            ),
            message: `Users field must be array of two usernames!`
        }
    },
})

directChannelSchema.pre("validate", function () {
    this.id = uuidv4()
})

directChannelSchema.pre('save', async function () {
    const channelQuery = {
        "users": { $all: this.users }
    }
    const exists = await DirectChannel.exists(channelQuery)
    if (exists) throw new Error(`Direct channel between ${this.users[0]} and ${this.users[1]} already exists!`)
    const userQuery = {
        "username": { $in: this.users }
    }
    const count = await User.countDocuments(userQuery)
    if (count !== 2) throw new Error("At least one of specified users does not exist in database!")
});

const DirectChannel = mongoose.model<TDirectChannelDB>("DirectChannel", directChannelSchema)

export default DirectChannel