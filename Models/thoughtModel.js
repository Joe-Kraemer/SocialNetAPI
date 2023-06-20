const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')

const thoughtSchema = mongoose.Schema({

    thoughtText: {type: String, required: true, maxLength: 280, },
    date: {type: Date, default: Date.now()},
username: {type: String, required: true},
reactions: [{ type : ObjectId, ref: 'Reaction' }]
},{timestamps: true })

thoughtSchema.plugin(findOrCreate)
thoughtSchema.virtual('formattedDate').get(function() {
    const yyyy = this.date.getFullYear();
let mm = this.date.getMonth() + 1; // Months start at 0!
let dd = this.date.getDate();

const formattedToday = dd + '/' + mm + '/' + yyyy;
return formattedToday
});

thoughtSchema.virtual("reactionCount").get(function() {
return this.reactions.length + 1
})

const reactionSchema = mongoose.Schema({
reactionId: {type: Schema.Types.ObjectId},
reactionBody: {type: String, required: true, maxLength: 280},
username: {type: String, required: true, },
date: {type: Date, default: Date.now()},

},{timestamps: true})

reactionSchema.pre("save",function(next){
//generate object id as reaction id
this.reactionId = new mongoose.mongo.ObjectId();

    next()
})

reactionSchema.virtual('formattedDate').get(function() {
    const yyyy = this.date.getFullYear();
let mm = this.date.getMonth() + 1; // Months start at 0!
let dd = this.date.getDate();

const formattedToday = dd + '/' + mm + '/' + yyyy;
return formattedToday
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = mongoose.model('Thought', thoughtSchema)
