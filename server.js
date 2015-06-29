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
  saveUninitialized: false
}));

//form submission
server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(express.static('./public'));

server.user(methodOverride('_method'));

server.use(function(req, res, next) {
  console.log(req.body);
  console.log(req.params);
  console.log(req.session);
  next();
});

//routes
var userController = require('./controllers/users.js');
server.use('/users', userController);

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

//database and server status

mongoose.connect('mongodb://localhost:27017/project_two');
var db = mongoose.connection;

db.on('error', function(){
  console.log("database errors....!");
})

db.once('open', function(){
  console.log("Database Active");
  server.listen(3000, function(){
    console.log('Server up on 3000');
  });
});
