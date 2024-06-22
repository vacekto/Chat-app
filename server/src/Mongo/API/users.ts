import { IUser } from "@chatapp/shared"
import User from "../models/User"
import { TMongoDoc, TMongoLean } from "../../types";
import { ObjectId } from "mongoose";

type TGetUserLean = (user?: Partial<IUser> & { _id?: string | ObjectId }) => Promise<TMongoLean<IUser> | null>
export const getUserLean: TGetUserLean = (user) => {
    const query = User.findOne(user).lean()
    return query.exec()
}

type TGetUser = (user?: Partial<IUser> & { _id?: string | ObjectId }) => Promise<TMongoDoc<IUser> | null>
export const getUser: TGetUser = (user) => {
    const query = User.findOne(user)
    return query.exec()
}

export const createUser = (userData: Omit<IUser, "id">) => {
    const newUser: TMongoDoc<IUser> = new User(userData)
    return newUser.save()
}

type TGetUsersFuzzy = (username: string) => Promise<TMongoDoc<IUser>[]>
export const getUsersFuzzy: TGetUsersFuzzy = (usernameSearch) => {
    const pattern = `\\b\\w*${usernameSearch}\\w*\\b`
    const regex = new RegExp(pattern, "i");
    const query = User.find(
        { "username": { $regex: regex } }
    )
    return query.exec()
}
