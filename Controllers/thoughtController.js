const {Thought, Reaction} = require ('../Models/thoughtModel')

const getAllThoughts = async (req, res ) => {
    try {
        const thoughts = await Thought
              .findAll().populate("reactions")
        res.status(200).json({ results: thoughts })
    } catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    //   }
      
}

const getThought = async (req, res ) => {
    const _id = req.params.id 
    try {
        const thoughts = await Thought
              .find({ _id: _id }).populate("reactions")
        res.status(200).json({ results: thoughts })
    } catch (err) {
        res.status(500).json({ message: "Error ..." })
    }  
}

const createThought = async (req, res ) => {
      // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    //   }

    try {
        const {thoughtText,username,userId} = req.body
    const thought = {
thoughtText,username,userId
    }
    const doc = await Thought.create(thought);
    res.status(200).json({ results: doc })
    } catch (err) {
        res.status(500).json({ message: "Error ..." })

    }
}

const editThought = async (req, res ) => {
    const _id = req.params.id 
    const {thoughtText} = req.body 
    const filter = {_id}
    const update = {thoughtText}
    try {
        const thought = await Thought
              .findOneAndUpdate(filter,update)
        res.status(200).json({ results: thought })
    } catch (err) {
        res.status(500).json({ message: "Error ..." })
    }  

}

const deleteThought = (req, res ) => {
    const _id = req.params.id 
    try {
       Thought.findOneAndDelete({ _id: _id })
        res.status(200).json({ results: "deleted."})
    } catch (err) {
        res.status(500).json({ message: "Error ..." })
    }  

}





// POST to create a reaction stored in a single thought's reactions array field
const createReaction = async (req, res) => {
//     reactionId: {type: Schema.Types.ObjectId},
// reactionBody: {type: String, required: true, maxLength: 280},
// username: {type: String, required: true, },

    const {reactionBody,username} = req.body
    const reaction = {
        reactionBody:reactionBody,
        username:username
    }
    const reactionDoc = await Reaction.create(reaction);
    const {reactionId} = reactionDoc
    try{
        let thoughtDoc = await Thought.findById(thoughtId);
        thoughtDoc.reactions.addToSet(reactionId);
        await thoughtDoc.save();
res.status(200).json({ results: thoughtDoc}) //might need adjusted to send back users thoughts or thought & reaction
    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

// DELETE to pull and remove a reaction by the reaction's reactionId value
const deleteReaction = async (req, res) => {
    const {reactionId} = req.params
    const filter = {reactionId}
    try{
        let doc = Thought.findOne(filter)
                doc.thoughts.pull(reactionId);

        Reaction.findOneAndDelete(reactionId);

        await doc.save();
res.status(200).json({ results: doc})

    }    catch (err) {
        res.status(500).json({ message: "Error ..." })
    }
}

module.exports = {getAllThoughts, getThought, createThought, editThought, deleteThought, createReaction, deleteReaction}

// thoughtsRouter.get('/thoughts', Cors(), thoughtController.getAllThoughts)
// thoughtsRouter.get('/thought', Cors(), thoughtController.getThought)
// thoughtsRouter.post('/thought', Cors(), thoughtController.createThought)
// thoughtsRouter.put('/thought',Cors(), thoughtController.editThought)
// thoughtsRouter.delete('/thought', Cors(), thoughtController.deleteThought)
