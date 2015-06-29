var express = require('express'),
    server  = express(),
    ejs     = require('ejs'),
    bodyParser = require('body-parser'),
    sessions = require('express-sessions');

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({
  extended: true;
}));

server.listen(3000, function(){
  console.log('Server up on 3000');
})
