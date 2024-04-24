import { TErrorMiddleware } from "../types"
import { IResponseError } from "@chatapp/shared"
import mongoose from "mongoose"
import { MongoError, MongoServerError, } from 'mongodb';
import ResourceNotFoundError from '../util/errorClasses/ResourceNotFound'
import BadUserInput from "../util/errorClasses/BadUserInput";
import { ZodError } from "zod";


type TErrorHandlers = {
    [prop: string]: TErrorMiddleware
}

const errorsHandlers: TErrorHandlers = {
    customErrors: function (err, req, res, next) {
        let responseError: IResponseError = {
            message: "",
        }

        if (err instanceof ResourceNotFoundError) {
            responseError.message = err.message
            res.status(404).send(responseError)
            return
        }

        if (err instanceof BadUserInput) {
            responseError.message = err.message
            res.status(409).send(responseError)
            return
        }

        next(err)
    },

    zodErrors: function (err, req, res, next) {
        let responseError: IResponseError = {
            message: "",
        }


        if (!(err instanceof ZodError)) {
            next(err)
            return
        }

        responseError.message = 'validataion error'
        responseError.errors = err.errors

        res.status(400).send(responseError)
    },

    mongooseErrors: function (err, req, res, next) {
        let responseError: IResponseError = {
            message: "",
        }

        if (err instanceof mongoose.Error.ValidationError) {
            responseError.message = "DB validation error"
            responseError.errors = err.errors
            res.status(400).send(responseError)
            return
        }

        if (err instanceof MongoServerError && err.code === 11000) {

            interface IUniqueError extends MongoError {
                keyValue: { [prop: string]: any }
            }

            const uniqueErr = err as IUniqueError
            const propTaken = Object.keys(uniqueErr.keyValue)[0]
            const value = uniqueErr.keyValue[propTaken]
            responseError.message = `${propTaken} '${value}' is already taken`
            res.status(409).send(responseError)
            return

        }

        if (err.name === 'CastError') {
            interface ICastError extends MongoError {
                path: string,
                value: string
            }

            const castErr = err as ICastError
            responseError.message = `invalid ${castErr.path}: '${castErr.value}'`
            res.status(400).send(responseError)
            return
        }

        next(err)
    }

}


const errorMiddleware: TErrorMiddleware[] = Object.values(errorsHandlers)

export default errorMiddleware