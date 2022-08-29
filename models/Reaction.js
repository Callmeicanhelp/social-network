const { Schema, Types } = require('mongoose');
const User = require('./User');


const reactionSchema = new Schema({
  child: new Schema({
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId.new
    },

    reactionBody: {
      type: String,
      required: "Type your reaction here!",
      minlength: 1,
      maxlength: 280
    },

    username: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
      timestamps: true
    }
  })
})

module.exports = reactionSchema;