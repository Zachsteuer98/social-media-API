const { Schema, model } = require('mongoose');

const UsernameSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trimmed: true
    },
    email: {
        type: String,
        required: 'Email address is requried',
        unique: true,
        validate: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [

    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

UsernameSchema.virtual('thoughtCount').get(function() {
    return this.comments.length;
});

//create the username model using the Username Schema
const Username = model('Username', UsernameSchema);

//export the Username model
module.exports = Username