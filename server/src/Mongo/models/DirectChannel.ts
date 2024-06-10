import mongoose, { Schema } from "mongoose";
import { IGroupChannel as IDirectChannel } from "@chatapp/shared";
import { v4 as uuidv4 } from 'uuid';

type TDirectChannelDB = Omit<IDirectChannel, "messages"> & {
    messages: Schema.Types.ObjectId[]
}

const directChannelSchema = new mongoose.Schema<TDirectChannelDB>({

    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    messages: [{ type: Schema.Types.ObjectId, ref: 'Room' }],

    users: [String],
})

directChannelSchema.pre('save', function () {
    this.id = uuidv4()
});

const DirectChannelModel = mongoose.model<TDirectChannelDB>("DirectChannel", directChannelSchema)

export default DirectChannelModel