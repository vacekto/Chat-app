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
    channelId: {
        type: String,
        required: true,
        trim: true,
    }
})

messageSchema.pre('save', function () {
    this.id = uuidv4()
});

const Message = mongoose.model<IMessage>("Message", messageSchema)

export default Message