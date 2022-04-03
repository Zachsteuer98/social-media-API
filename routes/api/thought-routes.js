const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought
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


module.exports = router