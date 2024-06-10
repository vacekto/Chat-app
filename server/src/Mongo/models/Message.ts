import mongoose, { Schema } from "mongoose";
import { IMessage } from "@chatapp/shared";
import { v4 as uuidv4 } from 'uuid';

type TMessageDB = Omit<IMessage, "roomId"> & {
    roomId: Schema.Types.ObjectId
}

const messageSchema = new mongoose.Schema<TMessageDB>({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    text: String,
    roomId: {
        required: true,
        type: String
    }
})

messageSchema.pre('save', function () {
    this.id = uuidv4()
});

const MessageModel = mongoose.model<TMessageDB>("Message", messageSchema)

export default MessageModel