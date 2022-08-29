const router = require("express").Router();
const userRoutes = require("./routes/api/users.js");
const thoughtRoutes = require("./routes/api/thoughts.js");

router.use("/User", userRoutes);
router.use("/Thought", thoughtRoutes);

module.exports = router;
