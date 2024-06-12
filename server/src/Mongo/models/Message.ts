import mongoose, { Schema } from "mongoose";
import { IMessage } from "@chatapp/shared";
import { v4 as uuidv4 } from 'uuid';

const messageSchema = new mongoose.Schema<IMessage>({
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
})

messageSchema.pre('save', function () {
    this.id = uuidv4()
});

const MessageModel = mongoose.model<IMessage>("Message", messageSchema)

export default MessageModel