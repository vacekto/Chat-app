"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const ResourceNotFound_1 = __importDefault(require("../util/errorClasses/ResourceNotFound"));
const BadUserInput_1 = __importDefault(require("../util/errorClasses/BadUserInput"));
const zod_1 = require("zod");
const errorsHandlers = [
    function customErrors(err, req, res, next) {
        let responseError = {
            errorMessage: "",
        };
        if (err instanceof ResourceNotFound_1.default) {
            responseError.errorMessage = err.message;
            res.status(404).send(responseError);
            return;
        }
        if (err instanceof BadUserInput_1.default) {
            responseError.errorMessage = err.message;
            res.status(409).send(responseError);
            return;
        }
        next(err);
    },
    function zodErrors(err, req, res, next) {
        if (!(err instanceof zod_1.ZodError)) {
            next(err);
            return;
        }
        let responseError = {
            errorMessage: err.errors[0].message,
            errors: err.errors
        };
        res.status(400).send(responseError);
    },
    function mongooseErrors(err, req, res, next) {
        let responseError = {
            errorMessage: "",
        };
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            responseError.errorMessage = "DB validation error";
            responseError.errors = err.errors;
            res.status(400).send(responseError);
            return;
        }
        if (err instanceof mongodb_1.MongoServerError && err.code === 11000) {
            const uniqueErr = err;
            const propTaken = Object.keys(uniqueErr.keyValue)[0];
            const value = uniqueErr.keyValue[propTaken];
            responseError.errorMessage = `${propTaken} '${value}' is already taken`;
            res.status(409).send(responseError);
            return;
        }
        if (err.name === 'CastError') {
            const castErr = err;
            responseError.errorMessage = `Invalid ${castErr.path}: '${castErr.value}'`;
            res.status(400).send(responseError);
            return;
        }
        next(err);
    },
    function logErrors(err, req, res, next) {
        console.log(err);
        next(err);
    }
];
exports.default = errorsHandlers;
