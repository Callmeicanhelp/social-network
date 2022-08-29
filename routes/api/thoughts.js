const router = require("express").Router();

const { Thought } = require("../models");

const thoughtRoutes = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET a thought by its ID
  getThoughtById({ params }, res) {
    Thought.find({ _id: params.id })
      .then((dbThoughtData) => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
          res
            .status(404)
            .json({
              message: "No thought found with this id. PLease try again!",
            });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //POST a new thought
  postThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err));
  },

  // PUT to update thought by its ID
  updateThought({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        // If user does not exist, display error message
        if (!dbThoughtData) {
          res
            .status(404)
            .json({
              message: "No thought found with this id. Please try again!",
            });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //DELETE a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({
              message: "No thought found with this id. Please try again!",
            });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

const {
  getAllThoughts,
  getThoughtById,
  postThought,
  updateThought,
  deleteThought,
} = require("../../controllers/Thought-controller");

// /api/thoughts
router.route("/").get(getAllThoughts).post(postThought);

// /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
(module.exports = thoughtRoutes), router;
