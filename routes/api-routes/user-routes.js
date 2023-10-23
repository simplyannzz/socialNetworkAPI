const router = require('express').Router();
const {
    getAllUser,
    createUser,
    getUserById,
    updateUserById,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

//api/users
    //Get & Post all User
    //api/user
    router.route('/').get(getAllUser).post(createUser);

    // Get, Put, and Delete by user ID
    //api/user/:userId
router.route('/:userID').get(getUserById).put(updateUserById).delete(deleteUser);



    // api / users /: userId / friends /: friendId
// Post to add new friends to a user's friend list
// Deleted to remove a friend from a user's friend list
router.route('/:userId/friends/:friendID').post(addFriend).delete(removeFriend);

module.exports = router;
