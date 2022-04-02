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
        Thought.findOne({ _id: params.id })
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
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return Username.findOneAndUpdate(
                    { _id: params.usernameId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserNameData => {
                if (!dbUserNameData) {
                    res.status(404).json({ message: 'no user found with this Id' });
                    return;
                }
                res.json(dbUserNameData);
            })
            .catch(err => res.json(err));
    },

    //Update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ params: params.id }, body, { new: true })
            .then(updatedThought => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'No thought found with this Id' })
                }
                return Username.findOneAndUpdate(
                    { _id: params.usernameId },
                    { $push: { thoughts: params.thoughtId } },
                    { new: true }
                );
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
                return Username.findOneAndUpdate(
                    { _id: params.usernameId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUsernameData => {
                if (!dbUsernameData) {
                    res.status(404).json({ message: 'No user found found with this Id' });
                    return;
                }
                res.json(dbUsernameData);
            })
            .catch(err => res.json(err));
    }
}