const { Thought } = require('../models');

// Get all thoughts
const thoughtController = {

  // get all thoughts
  getAllthought(req, res) {
    Thought.find({})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },


  // Get thought by user
  getThoughtByUser({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then(dbThoughtData => {
      // If user does not exist, display error message
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }


  //Create thought
  postThought({ params }, res) {
    Thought
  }

  //Delete thought
}
module.exports = thoughtController;