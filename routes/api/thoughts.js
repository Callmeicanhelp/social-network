const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  postThought,
  updateThought,
  deleteThought,
} = require("../thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(postThought);

// /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
