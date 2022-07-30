const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
    child: new Schema({
        reactionID: {
            type: ObjectId,
            default: ObjectId.new
        },
        
    })
})