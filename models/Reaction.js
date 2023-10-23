const { Schema, Types } = require('mongoose');

// Schema to create reaction model
const reactionSchema = new Schema(
    {
        reactionId:
        {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:
        {
            type: String,
            required: true,
            maxLength: 280,
        },
        username:
        {
            type: String,
            required: true,
        },
        createAt:
        {
            type: Date,
            default: Date.Now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
    },

    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema