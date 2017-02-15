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

module.exports=router;
