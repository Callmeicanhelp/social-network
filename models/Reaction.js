const { Schema, model } = require('mongoose');
const User = require('./User');


const ReactionSchema = new Schema({
    child: new Schema({
        reactionID: {
            type: ObjectId,
            default: ObjectId.new
        },
        reactionBody: {
            type: String,
            required: "Type your reaction here!",
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            timestamps: true
        }
    })
})

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;