import mongoose, { Schema } from "mongoose";
import { TPasskey } from "src/types";

const passkeySchema = new mongoose.Schema<TPasskey>({

    id: {
        type: String,
        required: true,
        unique: true,
    },
    publicKey: {
        type: Uint8Array,
        required: true,
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    backedUp: Boolean,
    counter: Number,

}, { versionKey: false })

const passkeyModel = mongoose.model<TPasskey>("Passkey", passkeySchema)

export default passkeyModel