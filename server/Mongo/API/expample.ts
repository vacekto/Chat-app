import User from "../models/User"

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
