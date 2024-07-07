import { IUser } from "@chatapp/shared"
import User from "../models/User"
import { IUserDB, TMongoDoc, TMongoLean } from "../../types";
import { ObjectId } from "mongoose";

type TUserArg = Partial<IUserDB> & { _id?: string | ObjectId }

export async function getUser(user: TUserArg): Promise<null | TMongoDoc<IUserDB>> {
    const query = User.findOne(user)
    return query.exec()
}

export function getUserLean(user: TUserArg) {
    const query = User.findOne(user).lean()
    return query.exec() as Promise<null | TMongoLean<IUserDB>>
}


export function getUsers(usernames: string[] | "*") {
    const query = usernames === "*" ?
        User.find() :
        User.find({
            "username": { $in: usernames }
        })
    return query.exec() as Promise<TMongoDoc<IUserDB>[]>
}

export function getUsersLean(usernames: string[] | "*") {
    const query = usernames === "*" ?
        User.find() :
        User.find({
            "username": { $in: usernames }
        })
    return query.lean().exec() as Promise<TMongoLean<IUserDB>[]>
}

export function createUser(userData: Omit<IUser, "id">) {
    const newUser: TMongoDoc<IUserDB> = new User(userData)
    return newUser.save()
}

export async function getUsersFuzzySearch(usernameSearch: string) {
    const pattern = `\\b\\w*${usernameSearch}\\w*\\b`
    const regex = new RegExp(pattern, "i");
    const query = User.find(
        { "username": { $regex: regex } }
    )
    return query.exec() as Promise<TMongoDoc<IUserDB>[]>
}

export async function getUsersLeanFuzzySearch(usernameSearch: string) {
    const pattern = `\\b\\w*${usernameSearch}\\w*\\b`
    const regex = new RegExp(pattern, "i");
    const query = User.find(
        { "username": { $regex: regex } }
    )

    return query.lean().exec() as Promise<TMongoLean<IUserDB>[]>
}

export async function addDirectChannelId(usernames: [string, string], channelId: string) {
    return User.updateMany(
        { "username": { $in: usernames } },
        { $push: { directChannelsIds: channelId } }
    )
}