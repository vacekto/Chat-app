import { Router } from 'express'
import * as controllers from '@/src/middleware/controllers'
import * as auth from '@/src/middleware/authentication'
import * as validate from '@/src/middleware/validation'
import * as errors from '@/src/middleware/errors'
import { middlewareErrorDecorator } from '../util/decorators'

const router = Router()

router.get('/test', middlewareErrorDecorator(controllers.test))

router.post('/register', validate.registerData, controllers.register)

router.post('/login', validate.loginData, auth.user, controllers.login)

router.get('/verify/:verificationId')

router.use(errors.invalidPathHandler)

router.use(errors.errorHandler)

export default router