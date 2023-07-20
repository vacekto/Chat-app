import mongoose from "mongoose";

async function connect() {

    try {
        await mongoose.connect(process.env.MOGODB_CON_STRING as string)
        console.log('connected to DB')
    }

    catch (err) {
        console.log("coudld not connect to DB")
        process.exit(1)
    }
}

export default connect