// Person schema and model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: {type: String, required: true},
  tags: Array,
  watchlist: Array,
  searches: Array
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
