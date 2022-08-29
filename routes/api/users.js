const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
} = require("../api/users.js");

// /api/users
router.route("/").get(getAllUsers).post(postUser);

// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
