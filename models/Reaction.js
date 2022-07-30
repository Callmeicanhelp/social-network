const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    child: new Schema({
        reactionID: {
            type: ObjectId,
            default: ObjectId.new
        },
        reactionBody: {
            type: String,
            required: "Type your reaction here!",
            maxlength: 250
        },
        username: {
            type: Schema.Types.ObjectId,
            ref:'User'
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