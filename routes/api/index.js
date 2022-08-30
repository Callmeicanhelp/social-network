const router = require("express").Router();
const userRoutes = require("./users");
const thoughtRoutes = require("./thoughts");

router.use("/User", userRoutes);
router.use("/Thought", thoughtRoutes);

module.exports = router;
