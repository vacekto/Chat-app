import mongoose, { Schema } from "mongoose";
import { TGroupChannelDB } from "../../types";
import { v4 as uuidv4 } from 'uuid';

const groupChannelSchema = new mongoose.Schema<TGroupChannelDB>({

    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    messages: [{ type: Schema.Types.ObjectId, ref: 'Room' }],

    channelName: {
        type: String,
        required: true,
        trim: true,
    },

    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

groupChannelSchema.pre('save', function () {
    this.id = uuidv4()
});

const GroupChannel = mongoose.model<TGroupChannelDB>("GroupChannel", groupChannelSchema)

export default GroupChannel