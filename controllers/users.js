var express = require('express'),
    router  = express.Router(),
    User    = require('../models/users.js');

//define routes

router.get('/new', function(req, res){
  res.render('users/new')
})

router.post('/', function(req, res){
  var newUser = User(req.body.user);
  newUser.save(function(err, user) {
    res.redirect(301, '/users/' + user._id)
  })
});

router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    console.log(user);
  })
});

//export the router object
module.exports = router;
