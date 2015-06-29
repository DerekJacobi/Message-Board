var express = require('express'),
    router  = express.Router(),
    Post    = require('../models/post.js');

router.get('/', function(req, res){
  Post.find({}, function(err, postArray){
    if(err){
      console.log(err);
    } else {
      console.log(postArray);
      res.render('posts/homepage', {posts: postArray})
    }
  })
})

router.post('/', function(req, res){
  // var newComment = (req.body.post.comment);
  console.log(res.body);
});

module.exports = router;
