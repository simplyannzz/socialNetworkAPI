const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtsById,
    updateThoughtById,
    deleteThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thought-controller');



//api/thought
//Get & Post all thought
//api/thought
router.route('/').get(getAllThoughts).post(createThought);

// Get, Put, and Delete by user ID
//api/user/:userId
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);


//api/thoughts/:thoughtId/reactions
//  POST to create a reaction stored in a single thought's reactions array field
router.route('/:thoughtId/reactions').post(createReaction);

//  DELETE to pull and remove a reaction by the reaction's reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

