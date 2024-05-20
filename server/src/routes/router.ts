import { Router } from 'express'
import * as controllers from '../middleware/controllers'
import { middlewareErrorDecorator } from '../middleware/decorator'

const router = Router()

router.get('/healthCheck', (req, res, next) => {
    console.log('healthCheck')
    res.status(200).send('OK')
})

router.get('/test', middlewareErrorDecorator(controllers.test))
router.post('/refreshToken', middlewareErrorDecorator(controllers.refreshToken))
router.post('/logout', middlewareErrorDecorator(controllers.logout))
router.post('/register', middlewareErrorDecorator(controllers.register))
router.post('/passwordLogin', middlewareErrorDecorator(controllers.passwordLogin))
router.post('/passkeyLogin', middlewareErrorDecorator(controllers.passkeyLogin))
router.post('/createPassKey', middlewareErrorDecorator(controllers.createPassKey))
router.get('/OAuth', middlewareErrorDecorator(controllers.OAuth))
router.get('/googleLogin', middlewareErrorDecorator(controllers.googleLogin))
// router.get('/verify/:verificationId')

export default router