const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 0,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
}
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        requried: true,
        validate: [/^(.{0,280}[^\s]*).*/, 'Thought must be between 0 and 280 characters.'],
        match: [/^(.{0,280}[^\s]*).*/, 'Thought must be between 0 and 280 characters.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters:  true
    },
    id: false
  }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;