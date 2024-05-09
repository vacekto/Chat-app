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
router.post('/login', middlewareErrorDecorator(controllers.login))
router.get('/verify/:verificationId')
router.post('/bitWardenLogin', middlewareErrorDecorator(controllers.bitWardenLogin))

export default router