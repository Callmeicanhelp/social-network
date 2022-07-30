const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 1,
        required: 'Enter your desired username'
        },

        password: {
        type: String,
        trim: true,
        required: 'Password',
        validate: [({ length }) => length >= 6, 'Password should be longer.']
        },

        email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },

        thoughts: [
            { type: Schema.Types.ObjectId }
        ],

        friends: []
    },
    {
        toJSON: {
        virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friend.length(0, this.friends.indexOf('@'));
});

const User = model('User', UserSchema);

module.exports = User;