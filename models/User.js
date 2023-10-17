const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
                },
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
        friends:[
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
          }
        ]
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});
// Creating the User model from the userSchema
const User = model('User',userSchema)
// Exporting the User model as a module
module.exports = User