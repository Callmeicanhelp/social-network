const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/Thought-controller');
  
// /api/Thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// /api/Thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;