import { TMiddleware } from "@/util/types";
import User from "@/Mongo/models/User";
import { IRegisterData, ILoginData } from '@chatapp/shared'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import redis from '@/Redis/connect'

export const register: TMiddleware = async (req, res, next) => {

    const {
        username,
        password,
        email
    } = req.body as IRegisterData


    const user = await User.findOne({ username }).exec()
    if (user) {
        res.status(400).send('username already taken')
        return
    }

    const verificationId = uuidv4()

    const newUser = new User({
        username,
        email,
        password,
        verified: false,
        verificationId
    })

    await newUser.save()

    const transporter = nodemailer.createTransport({
        host: 'mail.openjavascript.info',
        port: 465,
        secure: true,
        auth: {
            user: 'test@openjavascript.info',
            pass: 'heslo1234'
        }
    })

    const verificationLink = `${process.env.HOST_SERVER}:${process.env.PORT_SERVER}/verify/${verificationId}`

    await transporter.sendMail({
        from: `OpenJavascript <test@openjavascript.info>`,
        to: email,
        subject: 'email verification',
        text: `veriication link: ${verificationLink}`

    })

    res.status(200).send('success')
}

export const login: TMiddleware = async (req, res) => {

    const {
        username,
        password,
    } = req.body as ILoginData

    const user = await User.findOne({ username }).exec()

    if (!user) {
        res.status(400).send('user not found')
        return
    }

    if (!user.verified) {
        res.status(400).send('your account is not verified')
        return
    }

    const passMatch = await bcrypt.compare(password, user!.password)

    if (!passMatch) {
        res.status(400).send('wrong input data')
        return
    }



    const cookieId = uuidv4()

    await redis.set(username, cookieId)

    res.cookie('cookieId', cookieId, {
        httpOnly: true
    })

    res.status(200).send('you are logged in')

}

export const verify: TMiddleware = async (req, res, next) => {
    const verificationId = req.body.verificationId
    const user = await User.findOne({ verificationId }).exec()

    if (!user) {
        res.status(400).send('bad input')
        return
    }

    if (verificationId !== user.verificationId) {
        res.status(500).send('bad input')
        return
    }

    user.verified = true

    await user.save()

    res.status(200).send('your email is verified')

}