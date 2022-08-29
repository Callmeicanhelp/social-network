const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "You must supply a valid e-mail address"],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friend.length(0, this.friends.indexOf("@"));
});

const User = model("User", userSchema);

module.exports = User;
