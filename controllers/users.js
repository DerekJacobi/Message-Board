var express = require('express'),
    router  = express.Router(),
    User    = require('../models/users.js');

//define routes

router.get('/', function(req, res){
  res.render('users/new')
});

router.post('/new', function(req, res){
  var username = req.body.user.username;
  var password = req.body.user.password;
  var email = req.body.user.email || null;
  User.create({username: username, password: password, email: email}, function(err, saved){
    if (err){
      console.log(err);
    } else {
      console.log("User Created");
      res.redirect(301, '/')
    }
  })
});

router.post('/', function(req, res){
  var newUser = User(req.body.user);
  newUser.save(function(err, user) {
    res.redirect(301, 'homepage')
  })
});

router.get('/login', function(req, res){
  res.render('users/login')
});

router.post('/login', function(req, res){
  req.session.username = req.body.username;
  req.session.password = req.body.password;
  req.session.email = req.body.email;

  res.redirect(301, '/posts');
});


//export the router object
module.exports = router;
