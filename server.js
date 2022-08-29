const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3002;

const { User } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', true);

app.post('/submit', ({ body }, res) => {
  const user = new User(body);

  User.create(user)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/users', (req, res) => {
  User.find({}).then(users => {
    res.json(users);
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
