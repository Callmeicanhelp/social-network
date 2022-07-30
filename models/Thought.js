const { Schema, model } = require('mongoose');
const User = require('./User');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'What is the title of your thought?'
    },
    thought: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 250,
        required: "Type your thought here!",
    },
    username: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: true
    },

    reactions: [reactionSchema],
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;