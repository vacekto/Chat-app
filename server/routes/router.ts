import { Router } from 'express'
import * as validate from '@/middleware/validation'
import * as controllers from '@/controllers/controllers'
import * as auth from '@/middleware/authentication'

const router = Router()

router.post('/register', validate.registerData, controllers.register)

router.post('/login', validate.loginData, auth.user, controllers.login)

router.get('/verify/:verificationId')


export default router