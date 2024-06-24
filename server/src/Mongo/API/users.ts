import { IUser } from "@chatapp/shared"
import User from "../models/User"
import { TMongoDoc, TMongoLean } from "../../types";
import { ObjectId } from "mongoose";

type TUserArg = Partial<IUser> & { _id?: string | ObjectId }
export function getUser(user: TUserArg, useLean?: false): Promise<TMongoDoc<IUser> | null>
export function getUser(user: TUserArg, useLean?: true): Promise<TMongoLean<IUser> | null>

export function getUser(user: TUserArg, useLean: boolean = false) {
    const query = User.findOne(user)
    if (useLean) query.lean()
    return query.exec()
}

export const createUser = (userData: Omit<IUser, "id">) => {
    const newUser: TMongoDoc<IUser> = new User(userData)
    return newUser.save()
}

export function getUsersFuzzySearch(usernameSearch: string, useLean?: false): Promise<TMongoDoc<IUser>[]>
export function getUsersFuzzySearch(usernameSearch: string, useLean?: true): Promise<TMongoLean<IUser>[]>

export function getUsersFuzzySearch(usernameSearch: string, useLean = false) {
    const pattern = `\\b\\w*${usernameSearch}\\w*\\b`
    const regex = new RegExp(pattern, "i");
    const query = User.find(
        { "username": { $regex: regex } }
    )
    if (useLean) query.lean()
    return query.exec()
}
