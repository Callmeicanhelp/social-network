const { Schema, model } = require('mongoose');
const User = require('./User');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'What is the title of your thought?'
    },
    thoughtText: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 280,
        required: "Type your thought here!",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: true
    },
    username: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reactions: [reactionSchema],
});

UserSchema.virtual('reactionCount').get(function() {
    return this.reactions.length(0, this.reactions.indexOf('@'));
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;