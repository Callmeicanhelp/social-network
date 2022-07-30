const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        firstName: {
        type: String,
        trim: true,
        required: 'Enter your First Name'
        },

        lastName: {
        type: String,
        trim: true,
        required: 'Enter your Last Name'
        },

        userName: {
        type: String,
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

        userCreated: {
        type: Date,
        default: Date.now
        }
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