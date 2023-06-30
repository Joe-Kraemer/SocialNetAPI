const User = require("../Models/userModel")
const mongoose = require ('mongoose')
const getAllUsers = async (req, res) => {
    // try{
        const users = await User.find()
res.status(200).json({ results: users})
    // }    catch (err) {
    //     res.status(500).json({ message: "Error ..." })
    // }
}

const getUser = async (req, res) => {
    const {_id} = req.params
    const filter = {_id:_id}
    try{
        const user = await User.findOne(filter)
        if (!user){
            res.status(404).json({ message: "Error ..."})
        }
res.status(200).json({ results: user})
    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

const createUser = async (req, res) => {
    var _id = new mongoose.Types.ObjectId();
    const {username, email} = req.body
    const filter = {_id:_id}
    const update = {username:username, email:email}
    try{
        const doc = await User.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
          });
          res.status(200).json({ results: doc})
    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

const editUser = async (req, res) => {
    console.log (req.params)
    const {id} = req.params
    const {username, email} = req.body
    const filter = {_id:id}
    const update = {username:username, email:email}
    try{
        const doc = await User.findOneAndUpdate(filter, update);
          res.status(200).json({ results: doc})
    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    const filter = {_id:id}
    try{
        User.findOneAndDelete(filter)
        res.status(200).json({ results: "deleted."})
    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

const addFriend = async (req, res) => {
    const {_id, friendId} = req.params
    try{
        let doc = await User.findById(_id);
        doc.friends.addToSet(friendId);
        await doc.save();
res.status(200).json({ results: doc})
    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

const removeFriend = async (req, res) => {
    const {_id, friendId} = req.params
    try{
        let doc = await User.findById(_id);
        doc.friends.pull(friendId);
        await doc.save();
res.status(200).json({ results: doc})

    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

module.exports = {getAllUsers, getUser, createUser, editUser, deleteUser, addFriend, removeFriend}

// userRouter.get('/users', Cors(), userController.getAllUsers)
// userRouter.get('/user', Cors(), userController.getUser)
// userRouter.post('/user', Cors(), userController.createUser)
// userRouter.put('/user',Cors(), userController.editUser)
// userRouter.delete('/user', Cors(), userController.deleteUser)
// userRouter.post('/users/:userId/friends/:friendId', Cors(), userController.addFriend)
// userRouter.delete('/users/:userId/friends/:friendId', Cors(), userController.removeFriend)










// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id