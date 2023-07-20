import { Request, Response, NextFunction } from 'express'

export type TMiddleware = (req: Request, res: Response, next: NextFunction) => void