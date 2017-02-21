var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

//getting user info from the db
router.get('/', function (req, res) {
  User.find({}, function (err, user) {
    if (err) {
      console.log('error GETting from the db', err);
      res.sendStatus(500);
      return;
    }
    res.send(user);
  });
}); // end get from the db

//saving user info to the db
router.post('/', function(req, res) {
  console.log('ROUTER storing ', req.body, 'to the DB');
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      console.log('error saving to the db', err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201);
  });
}); // end post to the db

//add game to watchlist
router.put('/:id', function(req, res) {
  var id = "58ab4b433a90d24fe894572e";
  var game = req.body;
  console.log('saving ', game.name, ' to the watchlist');
  // console.log('req.body to be stored is: ', req.body);
  User.findByIdAndUpdate(id, {$push: {"watchlist": game}},
  {safe: true, new: true},
   function(err) {
    if (err) {
      console.log('error updating watchlist: ', err);
      return res.sendStatus(500);
    }
    // console.log('ROUTER storing', req.body, ' to watchlist');
    res.sendStatus(204);
  });
});

//delete game from watchlist
router.put('/watchlist/:id', function(req, res) {
  var id = "58ab4b433a90d24fe894572e";
  var game = req.body;
  console.log('deleteing', game.name);
  // console.log('removing ', game.name, 'from the watchlist');
  User.findByIdAndUpdate(id, {$pull: {"watchlist": {id: game.id}}},
  {safe: true, new: true},
   function(err) {
    if (err) {
      console.log('error updating watchlist: ', err);
      return res.sendStatus(500);
    }
    // console.log('ROUTER storing', req.body, ' to watchlist');
    res.sendStatus(204);
  });
}); // end deleting game from watchlist call



module.exports=router;
