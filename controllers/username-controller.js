const { process_params } = require('express/lib/router');
const { Username } = require('../models');

const usernameController = {
    //get all users
    getAllUsers(req, res) {
        Username.find({})
            .then(dbUsernameData => res.json(dbUsernameData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get a single user by their _id and populated thought and friend data
    getUserById({ params }, res) {
        Username.findOne({ _id: params.id })
            .then(dbUsernameData => {
                //if no user is found, send 404
                if (!dbUsernameData) {
                    res.status(404).json({ message: 'No User found with this Id' })
                    return;
                }
                res.json(dbUsernameData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res) {
        Username.create(body)
            .then(dbUsernameData => res.json(dbUsernameData))
            .catch(err => res.status(400).json(err));
    },

    //add friend
    addFriend({ params }, res ) {
        Username.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId} },
            { new: true, runValidators: true}
        )
        .then(dbFriendData => {
            if (!dbFriendData) {
                res.status(404).json( { message: 'No User found with this ID' });
            return;
            }
            res.json(dbFriendData);
        })
        .catch(err => res.json(err));
    },

    //Update a user by their _id
    updateUser({ params, body }, res) {
        Username.findOneAndUpdate({ params: params.id }, body, { new: true, runValidators: true })
            .then(dbUsernameData => {
                if (!dbUsernameData) {
                    res.status(404).json({ message: 'No user found with this Id' })
                    return;
                }
                res.json(dbUsernameData);
            })
            .catch(err => res.status(400).json(err));
    },

    //Delete a user by their _id
    deleteUser({ params }, res) {
        Username.findOneAndDelete({ _id: params.id })
        .then(dbUsernameData => {
            if (!dbUsernameData) {
                res.status(404).json({ message: 'No User found with this Id'})
                return;
            }
            res.json(dbUsernameData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Delete a friend
    removeFriend({ params }, res) {
        Username.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId } },
            { new: true }
            )
            .then(dbFriendData => res.json(dbFriendData))
            .catch(err => res.json(err))
    }
};

module.exports = usernameController;