import mongoose, { Schema } from "mongoose";
import { IGroupChannel } from "@chatapp/shared";
import { v4 as uuidv4 } from 'uuid';

type TGroupChannelDB = Omit<IGroupChannel, "messages"> & {
    messages: Schema.Types.ObjectId[]
}

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

const GroupChannelModel = mongoose.model<TGroupChannelDB>("GroupChannel", groupChannelSchema)

export default GroupChannelModel