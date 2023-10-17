const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300,
        },
        createAt: {
            type: Date,
            default: Date.Now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// Creating the User model from the userSchema
const Thought = model('Thought', thoughtSchema)
// Exporting the User model as a module
module.exports = Thought