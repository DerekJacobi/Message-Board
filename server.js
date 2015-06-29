var express     = require('express'),
    server      = express(),
    ejs         = require('ejs'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    session     = require('express-session');

server.set('views', './views');

//rendering engine
server.set('view engine', 'ejs');

server.use(session({
  secret: 'wdiarcher',
  resave: false,
  saveUninitialized: false
}));

//form submission
server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(function(req, res, next) {
  console.log(req.session);
  next();
});

server.use(function(req, res, next) {
  req.session.viewCount = req.session.viewCount || 0;
  req.session.viewCount++;
  console.log("Views", req.session.viewCount);
  res.end();
});

server.listen(3000, function(){
  console.log('Server up on 3000');
})
