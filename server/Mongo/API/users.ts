import User from "../models/User"
import { IRegisterData } from "@chatapp/shared"
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (userData: IRegisterData) => {

    const {
        username,
        password,
        email
    } = userData

    const verificationId = uuidv4()

    const newUser = new User({
        username,
        email,
        password,
        verified: false,
        verificationId
    })

    await newUser.save()

    return newUser
}

const getTest = async () => {
    try {
        const test = await User.findById('64ad1dcbe8183868e689ac52')

    } catch (err) {
        console.log('err, no user')
    }
}


const saveTest = async () => {
    try {
        const test = await User.findById('64ad1dcbe8183868e689ac52')
        if (!test) throw new Error('no test')
        // make change to document
        const save = await test.save()

    } catch (err) {
        console.log('some err')
    }
}
