import { TErrorMiddleware } from "../../types"
import { IResponseError } from "@chatapp/shared"
import mongoose from "mongoose"
import { MongoError, MongoServerError, } from 'mongodb';
import ResourceNotFoundError from '../../util/errorClasses/ResourceNotFound'
import BadUserInputError from "../../util/errorClasses/BadUserInput";
import { ZodError } from "zod";

type TErrorHandlers = TErrorMiddleware[]

const errorsHandlers: TErrorHandlers = [

    function customErrors(err, req, res, next) {
        let responseError: IResponseError = {
            errorMessage: "",
        }

        if (err instanceof ResourceNotFoundError) {
            responseError.errorMessage = err.message
            res.status(404).send(responseError)
            return
        }

        if (err instanceof BadUserInputError) {
            responseError.errorMessage = err.message
            res.status(409).send(responseError)
            return
        }

        next(err)
    },

    function zodErrors(err, req, res, next) {
        if (!(err instanceof ZodError)) {
            next(err)
            return
        }

        let responseError: IResponseError = {
            errorMessage: err.errors[0].message,
            errors: err.errors
        }

        res.status(400).send(responseError)
    },

    function mongooseErrors(err, req, res, next) {
        let responseError: IResponseError = {
            errorMessage: "",
        }

        if (err instanceof mongoose.Error.ValidationError) {
            responseError.errorMessage = "DB validation error"
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
            responseError.errorMessage = `${propTaken} '${value}' is already taken`
            res.status(409).send(responseError)
            return

        }

        if (err.name === 'CastError') {
            interface ICastError extends MongoError {
                path: string,
                value: string
            }

            const castErr = err as ICastError
            responseError.errorMessage = `Invalid ${castErr.path}: '${castErr.value}'`
            res.status(400).send(responseError)
            return
        }

        next(err)
    },

    function logErrors(err, req, res, next) {
        next(err)
    }
]


export default errorsHandlers