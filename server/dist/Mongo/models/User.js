"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const shared_1 = require("@chatapp/shared");
const uuid_1 = require("uuid");
const userSchema = new mongoose_1.default.Schema({
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
            validator: function (username) {
                return shared_1.zodSchemas.usernameZS.safeParse(username).success;
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
            validator: function (email) {
                return shared_1.zodSchemas.emailZS.safeParse(email).success;
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
    },
}, { versionKey: false });
userSchema.pre('validate', function () {
    this.id = (0, uuid_1.v4)();
});
userSchema.pre('save', async function () {
    this.id = (0, uuid_1.v4)();
    if (!this.password)
        throw new Error("password required");
    const password = this.password.trim();
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    this.password = passwordHash;
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
