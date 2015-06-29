var express = require('express'),
    router  = express.Router(),
    User    = require('../models/users.js');

//define routes

router.get('/', function(req, res){
  res.render('users/new')
});

router.get('/new', function(req, res){
  res.render('users/new')
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
  console.log("Post");
  res.redirect(301, '/posts');
});

// router.get('/:id', function(req, res){
//   User.findById(req.params.id, function(err, user){
//     console.log(user);
//   })
// });

//export the router object
module.exports = router;
