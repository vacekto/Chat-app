import { IUser } from "@chatapp/shared"
import User from "../models/User"
import { IUserDB, TMongoDoc, TMongoLean } from "../../types";
import { ObjectId } from "mongoose";

type TUserArg = Partial<IUser> & { _id?: string | ObjectId }

export function getUser(user: TUserArg): Promise<null | TMongoDoc<IUserDB>> {
    const query = User.findOne(user)
    return query.exec()
}

export function getUserLean(user: TUserArg): Promise<null | TMongoLean<IUserDB>> {
    const query = User.findOne(user).lean()
    return query.exec()
}


export function getUsers(usernames: string[] | "*"): Promise<TMongoDoc<IUserDB>[]> {
    const query = usernames === "*" ?
        User.find() :
        User.find({
            "username": { $in: usernames }
        })
    return query.exec()
}

export function getUsersLean(usernames: string[] | "*"): Promise<TMongoLean<IUserDB>[]> {
    const query = usernames === "*" ?
        User.find() :
        User.find({
            "username": { $in: usernames }
        })
    query.lean()
    return query.exec()
}

export const createUser = (userData: Omit<IUser, "id">) => {
    const newUser: TMongoDoc<IUser> = new User(userData)
    return newUser.save()
}

export async function getUsersFuzzySearch(usernameSearch: string, useLean: boolean = false): Promise<TMongoDoc<IUserDB>[]> {
    const pattern = `\\b\\w*${usernameSearch}\\w*\\b`
    const regex = new RegExp(pattern, "i");
    const query = User.find(
        { "username": { $regex: regex } }
    )
    return query.exec()
}

export async function getUsersLeanFuzzySearch(usernameSearch: string, useLean: boolean = false): Promise<TMongoLean<IUserDB>[]> {
    const pattern = `\\b\\w*${usernameSearch}\\w*\\b`
    const regex = new RegExp(pattern, "i");
    const query = User.find(
        { "username": { $regex: regex } }
    )

    return query.lean().exec()
}