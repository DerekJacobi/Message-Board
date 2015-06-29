var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  email: { type: String, required: false}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
