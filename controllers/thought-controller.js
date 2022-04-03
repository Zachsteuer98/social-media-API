const { Thought, Username } = require('../models');

const thoughtController = {

    //Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //Get a single thought by it's Id
    getThoughtById({ params }, res) {
        const { thoughtId } = params;
        Thought.findOne({ _id: thoughtId })
            .then(dbThoughtData => {
                //if no thought is found, send 404 error
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this Id' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //Post thought to user
    addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return Username.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no user found with this Id' });
                    return;
                }
                console.log("line 49 is working", dbThoughtData)
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //Update a thought
    updateThought({ params, body }, res) {
        const { thoughtId } = params;
        Thought.findOneAndUpdate({ id_: thoughtId }, body, { new: true })
            .then(updatedThought => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'No thought found with this Id' })
                }
                // return Username.findOneAndUpdate(
                //     { _id: body.userId },
                //     { $push: { thoughts: params.thoughtId } },
                //     { new: true }
                // );
                res.json(updatedThought)
            })
            .then(dbUsernameData => {
                if (!dbUsernameData) {
                    res.status(404).json({ message: 'No user found found with this Id' });
                    return;
                }
                res.json(dbUsernameData);
            })
            .catch(err => res.json(err));
    },

    //Delete a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this Id' })
                }
                res.json(deletedThought)
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;