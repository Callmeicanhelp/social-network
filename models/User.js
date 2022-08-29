const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
        type: string,
        unique: true,
        trim: true,
        minlength: 1,
        required: true
        },

        email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'You must supply a valid e-mail address']
        },

        thoughts: [
            { 
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function() {
  return this.friend.length(0, this.friends.indexOf('@'));
});

const User = model('User', userSchema);

module.exports = User;