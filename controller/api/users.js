const { User } = require("../../models");
const router = require("express").Router();

// Get all users
router.route("/").get((req, res) => {
  User.find({})
    .select("-__v")
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}),
  //Get user by id
  router.route("/:id").get(({ params }, res) => {
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "This user id does not exist" });
          return;
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }),
  // Add new user
  router.post(({ body }, res) => {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }),
  //Update a user
  router.put(({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "This user id does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  }),
  // Delete a user
  router.delete(({ params }, res) => {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "This user id does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }),
  // Add friend
  router.put(({ params }, res) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "This user id does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }),
  // Delete friend
  router.delete(({ params }, res) => {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "This user id does not exist" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  });

module.exports = router;
