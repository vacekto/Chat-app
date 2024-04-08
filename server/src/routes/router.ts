import { Router } from 'express'
import * as controllers from '../middleware/controllers'
import { middlewareErrorDecorator } from '../middleware/decorator'

const router = Router()



router.get('/healthCheck', (req, res, next) => {
    console.log('healthCheck')
    res.status(200).send('OK')
})

router.get('/test', middlewareErrorDecorator(controllers.test))

router.post('/register', middlewareErrorDecorator(controllers.register))
// router.post('/register', validate.registerData, controllers.register)
router.post('/login', middlewareErrorDecorator(controllers.login))
// router.post('/login', validate.loginData, auth.user, controllers.login)

router.get('/verify/:verificationId')

export default router