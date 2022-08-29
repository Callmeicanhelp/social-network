const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
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

    userName: {
        type: Schema.Types.ObjectId,
        required: true
    },

    reactions: [reactionSchema],
  },
  
  {
    toJSON: {
        virtuals: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length(0, this.reactions.indexOf('@'));
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;