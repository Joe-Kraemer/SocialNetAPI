const express = require('express')
const Cors = require('cors')
const userController = require('../Controllers/userController')
const userRouter = express.Router({ mergeParams: true }) 

userRouter.get('/users', Cors(), userController.getAllUsers)
userRouter.get('/user', Cors(), userController.getUser)
userRouter.post('/user', Cors(), userController.createUser)
userRouter.put('/user',Cors(), userController.editUser)
userRouter.delete('/user', Cors(), userController.deleteUser)
userRouter.post('/users/:userId/friends/:friendId', Cors(), userController.addFriend)
userRouter.delete('/users/:userId/friends/:friendId', Cors(), userController.removeFriend)

module.exports = userRouter