import mongoose, { Schema } from "mongoose";
import { IDirectChannel, IMessage } from "@chatapp/shared";
import { v4 as uuidv4 } from 'uuid';

export type TDirectChannelDB<populated extends boolean = false> = Omit<IDirectChannel, "messages"> & {
    messages: populated extends true ? IMessage[] : Schema.Types.ObjectId[]
}

const directChannelSchema = new mongoose.Schema<TDirectChannelDB>({

    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],

    users: [String, String],
})

directChannelSchema.pre('save', function () {
    this.id = uuidv4()
});

const DirectChannel = mongoose.model<TDirectChannelDB>("DirectChannel", directChannelSchema)

export default DirectChannel