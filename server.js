var express         = require('express'),
    server          = express(),
    ejs             = require('ejs'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    User            = require('./models/users.js'),
    session         = require('express-session');

server.set('views', './views');

//rendering engine
server.set('view engine', 'ejs');

server.use("/stylesheets", express.static(__dirname + "/public"));

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

server.use(methodOverride('_method'));

server.use(function(req, res, next) {
  next();
});

//routes
var userController = require('./controllers/users.js');
server.use('/users', userController);

var postController = require('./controllers/post.js');
server.use('/posts', postController);

server.get('/', function(req, res, next){
  res.render('index', {
    username: req.session.username,
    password: req.session.password,
    email: req.session.email
  });
});

server.get('/home', function(req, res, next) {
  if (req.session.currentUser) {
    res.render('home', {
      currentUser: req.session.currentUser
    })
  }
  else {
    res.redirect(301, 'index')
  }
});

server.post('/', function(req, res, next) {
    var attempt = req.body.user;
    User.findOne({username: attempt.username} , function(err, user){
      if (user && user.password === attempt.password){
        req.session.currentUser = user.username;
        res.redirect(301, 'posts/');
      } else {
        console.log("Incorrect username/password");
        res.redirect(301, '/')
      }
    })
  });

//database and server status

mongoose.connect('mongodb://localhost:27017/project_two');
var db = mongoose.connection;

db.on('error', function(){
  console.log("database errors....!");
});

db.once('open', function(){
  console.log("Database Active");
  server.listen(3000, function(){
    console.log('Server up on 3000');
  });
});
