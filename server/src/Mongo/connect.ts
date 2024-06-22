import mongoose from "mongoose";

async function connect() {
    try {
        if (!process.env.MONGO_URI)
            throw new Error('mongo connection string not specified')
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to MongoDB')
    }

    catch (err) {
        console.log("coudld not connect to MongoDB, ", err)
    }
}

export default connect