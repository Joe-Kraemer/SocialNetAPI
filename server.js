const express = require("express")
const connectDB = require("./config/db")
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const thoughtsRouter = require('./Routes/thoughtsRouter')
const userRouter = require('./Routes/userRouter')
const APP_PORT = process.env.APP_PORT || 3001

const app = express()
connectDB()

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(jsonParser)

app.use('/api/thoughts', urlencodedParser, thoughtsRouter)
app.use('/api/users', urlencodedParser, userRouter)

app.get('/', (req, res) => {
    res.send('<h2>“Not today” – babe ruth</h2>')
})

app.listen(APP_PORT, () => console.log(`'Ello ${APP_PORT}.`))

// The walkthrough video must demonstrate GET routes for all users and all thoughts being tested in Insomnia.

// The walkthrough video must demonstrate GET routes for a single user and a single thought being tested in Insomnia.

// The walkthrough video must demonstrate POST, PUT, and DELETE routes for users and thoughts being tested in Insomnia.

// Walkthrough video must demonstrate POST and DELETE routes for a user’s friend list being tested in Insomnia.

// Walkthrough video must demonstrate POST and DELETE routes for reactions to thoughts being tested in Insomnia.

//649f2637ce5631d2d2cec5e6 ricks id <=