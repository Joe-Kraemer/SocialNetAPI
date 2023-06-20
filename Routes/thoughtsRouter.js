const express = require('express')
const Cors = require('cors')
const thoughtController = require('../Controllers/thoughtController')
const thoughtsRouter = express.Router({ mergeParams: true }) 

thoughtsRouter.get('/thoughts', Cors(), thoughtController.getAllThoughts)
thoughtsRouter.get('/thought', Cors(), thoughtController.getThought)
thoughtsRouter.post('/thought', Cors(), thoughtController.createThought)
thoughtsRouter.put('/thought',Cors(), thoughtController.editThought)
thoughtsRouter.delete('/thought', Cors(), thoughtController.deleteThought)

module.exports = thoughtsRouter