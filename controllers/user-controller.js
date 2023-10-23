const { User } = require('../models');

const userControll = {
    //Get all Users
    getAllUser(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    // Get a single User
    getUserById(req, res) {
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    //updated user by Id
    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    // Delete Users
    deleteUser(req, res) {
        User.findOneAndDelete(req.params.id)
            .then(userData => {
                if (!userData) {
                    return res.status(400).json({ message: "User not found" });
                }
                res.json({ message: "User deleted" });
            })
            .catch(err => res.status(500).json(err));
    },
    //Add friend
    addFriend(req, res) {
        User.findByOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId } },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    //Deleted friend
    removeFriend(req, res) {
        User.findByOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "User Id not found" });
                }
                // check if friends is deleted
                const remove = !dbUserData.friends.include(params.friendId);
                if (remove) {
                    res.json({ message: "Friend removed", dbUserData });
                } else {
                    res.json(dbUserData);
                }
            })
            .catch((err) => res.status(400).json(err));
    },
};

module.exports = userControll;
