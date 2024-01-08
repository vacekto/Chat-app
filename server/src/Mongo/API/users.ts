import { IUser, TRegisterData } from "@chatapp/shared"
import User from "../models/User"
import { TMongoDoc, TMongoLean } from "../../types";

/**
 * finds any one user in DB
 * 
 * @param user POJO representing user
 * @param useLean returns POJO without virtuals 
 * or any other ORM methods like .save, is faster and smaller
 * @returns Promise resolving in any one Document extending requested user 
 * or null if no user satisfies search params. Finds any user
 * if no user argument is provided and user exists in database.
 */

export function getUser(user?: Partial<IUser> & { _id?: string }, useLean?: true):
    Promise<TMongoLean<IUser & { password: string }> | null>;

export function getUser(user?: Partial<IUser> & { _id?: string }, useLean?: false):
    Promise<TMongoDoc<IUser & { password: string }> | null>;

export function getUser(user?: Partial<IUser> & { _id?: string }, useLean?: boolean) {
    const query = User.findOne(user)
    if (useLean) query.lean()
    return query.exec()
}

// /** 
//  * finds all users satisfying params
//  * 
//  * @param user POJO representing user
//  * @param useLean lean returns smaller Mognoose Document without virtuals or any other ORM methods, is faster
//  * @returns Promise resolving in array of all Documents extending requested user
//  */

// export const getUsers = (user?: Partial<IUser> & { _id?: ObjectId | string }) => {
//     return User.find({
//         $or: [],

//     })
// }

export function createUser(userData: TRegisterData): Promise<TMongoDoc<IUser & { password: string }>> {
    const newUser = new User(userData)
    return newUser.save()
}