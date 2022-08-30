const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3002;

// const { User } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:3002/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);

// app.post("/submit", ({ body }, res) => {
//   const user = new User(body);

//   User.create(user)
//     .then((dbUser) => {
//       res.json(dbUser);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// app.get("/users", (req, res) => {
//   User.find({}).then((users) => {
//     res.json(users);
//   });
// });

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
