import mongoose from 'mongoose'

const connectionDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER_NAME,
            pass: process.env.DB_PASSWORD,
            authMechanism: process.env.DB_AUTH_MECHANISM,
            authSource: process.env.DB_AUTH_SOURCE
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log("Database connect succesfully...")
    } catch (error) {
        console.log(error)
    }
}

export default connectionDB
