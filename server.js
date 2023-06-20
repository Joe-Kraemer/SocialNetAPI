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