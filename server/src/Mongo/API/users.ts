import { IUser } from "@chatapp/shared"
import User from "../models/User"
import { TMongoDoc, TMongoLean } from "../../types";
import { ObjectId } from "mongoose";

type TGetUserLean = (user?: Partial<IUser> & { _id?: string | ObjectId }) => Promise<TMongoLean<IUser> | null>
export const getUserLean: TGetUserLean = (user, populate?: boolean) => {
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