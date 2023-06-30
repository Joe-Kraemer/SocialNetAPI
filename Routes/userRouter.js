const express = require('express')
const Cors = require('cors')
const userController = require('../Controllers/userController')
const userRouter = express.Router({ mergeParams: true }) 

userRouter.get('/', Cors(), userController.getAllUsers)
userRouter.get('/:id', Cors(), userController.getUser)
userRouter.post('/', Cors(), userController.createUser)
userRouter.put('/:id',Cors(), userController.editUser)
userRouter.delete('/:id', Cors(), userController.deleteUser)
userRouter.post('/:userId/friends/:friendId', Cors(), userController.addFriend)
userRouter.delete('/:userId/friends/:friendId', Cors(), userController.removeFriend)

module.exports = userRouter