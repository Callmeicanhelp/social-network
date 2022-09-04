const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(500).json({
            message: "This thought id does not exist",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Post new thought
  postThought({ params, body }, res) {
    console.log(User);
    console.log(Thought);
    Thought.create(body).then(({ _id }) => {
      console.log(params);
      User.findOneAndUpdate(
        { _id: params.id },
        { $push: { thought: _id } },
        { new: true }
      )
        .then((dbThoughtData) => {
          console.log(dbThoughtData);
          if (!dbThoughtData) {
            res.status(404).json({ message: "This thought id does not exist" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    });
  },
  //Update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({
            message: "This thought id does not exist",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // Delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "This thought id does not exist" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // // Add reaction to thought
  // router.route("/:thoughtId/reactions").post(({ params, body }, res) => {
  //   Thought.findOneAndUpdate(
  //     {
  //       _id: params.thoughtId,
  //     },
  //     { $push: { reactions: body } },
  //     {
  //       new: true,
  //       runValidators: true,
  //     }
  //   )
  //     .populate({
  //       path: "reactions",
  //       select: "-__v",
  //     })
  //     .select("-__v")
  //     .then((dbThoughtData) => {
  //       if (!dbThoughtData) {
  //         res.status(500).json({
  //           message: "This thought id does not exist",
  //         });
  //         return;
  //       }
  //       res.json(dbThoughtData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.sendStatus(400);
  //     });
  // },
  // //Update reaction
  // router.route("/:thoughtId/reaction/:reactionID").delete(({ params }, res) => {
  //   Thought.findOneAndUpdate(
  //     { _id: params.thoughtId },
  //     { $pull: { reaction: { reactionId: params.reactionId } } },
  //     { new: true }
  //   )
  //     .then((dbThoughtData) => {
  //       if (!dbThoughtData) {
  //         res.status(404).json({ message: "This thought id does not exist" });
  //         return;
  //       }
  //       res.json(dbThoughtData);
  //     })
  //     .catch((err) => res.status(400).json(err));
  // })
};

module.exports = thoughtController;
