const mongoose = require("mongoose")
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
const connectDB = () => {
    connectWithRetry()
}

const connectWithRetry = async () => {
    return await mongoose.connect(MONGO_URI(), err => {
        if (err) {
            console.error('Failed to connect on startup = retrying in 1 second', err)
            setTimeout(connectWithRetry, 1000)
        }
        console.log("Connected to DB")
    })
}

module.exports = connectDB
