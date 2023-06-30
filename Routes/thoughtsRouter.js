const express = require('express')
const Cors = require('cors')
const thoughtController = require('../Controllers/thoughtController')
const thoughtsRouter = express.Router({ mergeParams: true }) 

thoughtsRouter.get('/', Cors(), thoughtController.getAllThoughts)
thoughtsRouter.get('/:id', Cors(), thoughtController.getThought)
thoughtsRouter.post('/', Cors(), thoughtController.createThought)
thoughtsRouter.put('/:id',Cors(), thoughtController.editThought)
thoughtsRouter.delete('/:id', Cors(), thoughtController.deleteThought)

module.exports = thoughtsRouter