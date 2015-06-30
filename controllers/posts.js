var express = require('express'),
    router  = express.Router(),
    Post    = require('../models/post.js');

router.get('/', function(req, res){
  Post.find({}, function(err, postArray){
    if(err){
      console.log(err);
    } else {
      res.render('posts/homepage', {posts: postArray})
    }
  })
})

router.get('/newpost', function(req, res){
  res.render('posts/newpost')
})

router.post("/:id", function (req, res) {
 var newComment = req.body.comments;
 console.log(newComment);
 var postId = req.params.id;
 Post.update({_id:postId},
   {$push: {comments: newComment}}, function(){
   res.redirect('/posts')
 });
});

router.post('/', function(req, res){
  var title = req.body.post.title;
  var post = req.body.post.post;
  Post.create({title: title, post: post}, function(err, saved){
    if (err){
      console.log(err);
    }
    else {
      console.log("Post Saved");
    }
  })
});



module.exports = router;
