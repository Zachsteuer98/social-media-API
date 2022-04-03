const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        requried: true,
        validate: [/^(.{0,280}[^\s]*).*/, 'Thought must be between 0 and 280 characters.'],
        match: [/^(.{0,280}[^\s]*).*/, 'Thought must be between 0 and 280 characters.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: []
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;