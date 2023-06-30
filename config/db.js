const mongoose = require("mongoose")
require('dotenv').config()

const MONGO_URI = "mongodb://127.0.0.1:27017/social"
const connectDB = () => {
    connectWithRetry()
}

const connectWithRetry = async () => {
    return await mongoose.connect(MONGO_URI)
}

module.exports = connectDB
, err => {
    if (err) {
        console.error('Failed to connect on startup = retrying in 1 second', err)
        setTimeout(connectWithRetry, 1000)
    }
    console.log("Connected to DB")
}