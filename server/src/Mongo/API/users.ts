import { IUser } from "@chatapp/shared"
import User from "../models/User"
import { TMongoDoc, TMongoLean } from "../../types";
import { ObjectId } from "mongoose";

type TUserArg = Partial<IUser> & { _id?: string | ObjectId }

export function getUser
    <UseLean extends boolean = false>(
        users: TUserArg, useLean?: UseLean
    ): Promise<UseLean extends true ?
        TMongoLean<IUser> | null :
        TMongoDoc<IUser> | null
    >

export function getUser(user: TUserArg, useLean: boolean = false) {
    const query = User.findOne(user)
    if (useLean) query.lean()
    return query.exec()
}

export function getUsers
    <UseLean extends boolean = false>(
        usernames: string[], useLean?: UseLean
    ): Promise<UseLean extends true ?
        TMongoLean<IUser>[] :
        TMongoDoc<IUser>[]
    >

export function getUsers(usernames: string[], useLean: boolean = false) {
    const query = User.find({
        "username": { $all: usernames }
    })
    if (useLean) query.lean()
    return query.exec()
}



export const createUser = (userData: Omit<IUser, "id">) => {
    const newUser: TMongoDoc<IUser> = new User(userData)
    return newUser.save()
}

export function getUsersFuzzySearch<UseLean extends boolean = false>(
    usernameSearch: string, useLean?: UseLean
): Promise<UseLean extends true ?
    TMongoLean<IUser>[] :
    TMongoDoc<IUser>[]
>

export async function getUsersFuzzySearch(usernameSearch: string, useLean: boolean = false) {
    const pattern = `\\b\\w*${usernameSearch}\\w*\\b`
    const regex = new RegExp(pattern, "i");
    const query = User.find(
        { "username": { $regex: regex } }
    )
    if (useLean) query.lean()
    return query.exec()
}
