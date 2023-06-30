const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Thought = require('./thoughtModel')
// define the schema for our user model
const userSchema = new mongoose.Schema({

    username: { type: String, required: true, trim: true, unique: true },
    email: {type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/},
    thoughts: [{ type: mongoose.Types.ObjectId, ref: 'Thought'}],
    friends: [{ type : mongoose.Types.ObjectId, ref: 'User' }],
    
},{
    toJSON: {
      virtuals: true,
    },
    id: false,
  })

userSchema.plugin(findOrCreate)
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


module.exports = mongoose.model('User', userSchema)

//this is how u get user and list of friends.
// var User = schemas.User;
// User
//  .find()
//  .populate('friends')
//  .exec(...)

// this is how u add friend to friends list when request is made.
//user.friends.push(newFriend._id);
