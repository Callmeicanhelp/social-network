const router = require("express").Router();
const userRoutes = require("../api/users.js");
const thoughtRoutes = require("../api/thoughts.js");

router.use("/User", userRoutes);
router.use("/Thought", thoughtRoutes);

module.exports = router;
