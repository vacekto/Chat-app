import mongoose from "mongoose";

async function connect() {
    try {
        if(!process.env.MONGO_CON_STRING)
            throw new Error('mongo connection string not specified')
        await mongoose.connect(process.env.MONGO_CON_STRING)
        console.log('connected to MongoDB')
    }

    catch (err) {
        console.log("coudld not connect to MongoDB, ", err)
        process.exit(1)
    }
}

export default connect