const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minlength: 1,
      maxlength: 280,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      timestamps: true,
    },

    username: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    reaction: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length(0, this.reaction.indexOf("@"));
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
