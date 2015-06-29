var express     = require('express'),
    server      = express(),
    ejs         = require('ejs'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    methodOverride = require('method-override')
    session     = require('express-session');

server.set('views', './views');

//rendering engine
server.set('view engine', 'ejs');

server.use(session({
  secret: 'wdiarcher',
  resave: true,
  saveUninitialized: true
}));

//form submission
server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(function(req, res, next) {
  console.log(req.session);
  next();
});

server.get('/', function(req, res, next){
  res.render('index', {
    username: req.session.username,
    password: req.session.password,
    email: req.session.email
  });
});

server.post('/', function(req, res, next) {
  req.session.username = req.body.username;
  req.session.password = req.body.password;
  req.session.email = req.body.email;
  res.redirect(301, '/');
});

server.listen(3000, function(){
  console.log('Server up on 3000');
})
