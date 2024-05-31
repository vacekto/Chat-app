"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = exports.getUserLean = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUserLean = (user, populate) => {
    const query = User_1.default.findOne(user).lean();
    return query.exec();
};
exports.getUserLean = getUserLean;
const getUser = (user) => {
    const query = User_1.default.findOne(user);
    return query.exec();
};
exports.getUser = getUser;
const createUser = (userData) => {
    const newUser = new User_1.default(userData);
    return newUser.save();
};
exports.createUser = createUser;
