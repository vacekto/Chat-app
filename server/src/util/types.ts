import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'

export type TUtilMiddleware = (req: Request, res: Response, next: NextFunction) => void
export type TErrorMiddleware = (err: Error | MongooseError, req: Request, res: Response, next: NextFunction) => void