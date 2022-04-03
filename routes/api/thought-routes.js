const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    addReaction,
    updateThought,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

// set up CRUD methods for thoughts at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// Get by ID, put, and delete at /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router