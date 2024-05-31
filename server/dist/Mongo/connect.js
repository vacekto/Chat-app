"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    try {
        if (!process.env.MONGO_URI)
            throw new Error('mongo connection string not specified');
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('connected to MongoDB');
    }
    catch (err) {
        console.log("coudld not connect to MongoDB, ", err);
    }
}
exports.default = connect;
