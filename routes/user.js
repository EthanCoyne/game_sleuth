var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var dateFormat = require('../public/vendor/dateformat');


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
  var id = "58b1e9b040a0620ed770b962";
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
  var id = "58b1e9b040a0620ed770b962";
  var game = req.body;
  console.log('deleting', game.name);
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

router.put('/discardSearch/:id', function(req, res) {
  var id = "58b1e9b040a0620ed770b962";
  var search1 = req.body.dateSearched.slice(0, 10);
  console.log('search1 string is ', search1);

  var search2 = req.body.dateSearched.slice(11, 23);
  console.log('search2 string is ', search2);

  var search = search1 + ' ' + search2 + 'Z';

  console.log('searchdate to pass to route is ', search);

  // console.log('deleting search where date is ', search.dateSearched);
  // console.log('removing ', game.name, 'from the watchlist');
  User.findByIdAndUpdate(id, {$pull: {"searches": {dateSearched: search}}},
  {safe: true, new: true},
   function(err) {
    if (err) {
      console.log('error discarding search: ', err);
      return res.sendStatus(500);
    }
    // console.log('ROUTER storing', req.body, ' to watchlist');
    res.sendStatus(204);
  });
});

// save search to the DB
router.put('/saveSearch/:id', function(req, res) {
  var id = "58b1e9b040a0620ed770b962";
  var search = req.body;
  var now = new Date();
  search.dateSearched = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  console.log('date is ', search.dateSearched);
  // console.log('saving ', search, ' to the history');
  // console.log('req.body to be stored is: ', req.body);
  User.findByIdAndUpdate(id, {$push: {"searches": search}},
  {safe: true, new: true},
   function(err) {
    if (err) {
      console.log('error updating history: ', err);
      return res.sendStatus(500);
    }
    // console.log('ROUTER storing', req.body, ' to watchlist');
    res.sendStatus(204);
  });
});



module.exports = router;
