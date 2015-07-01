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

router.post("/:id/comments", function (req, res) {
 var newComment = req.body.comments;
 console.log(newComment);
 var postId = req.params.id;
 Post.update({_id:postId},
   {$push: {comments: newComment}}, function(){
   res.redirect('/posts')
 });
});

router.delete('/:id', function(req, res){
  var mongoId = req.params.id;
  Post.remove({_id:mongoId}, function(err, post){
    res.redirect(301, '/posts');
  });
});

router.get('/:id/edit', function(req, res){
  var mongoId = req.params.id;
  Post.findOne({_id:mongoId}, function(err, postEdit){
    if (err) {
      console.log(err);
    } else {
      res.render('posts/edit', {post: postEdit});
    };
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
      res.redirect(301, "posts")
    }
  })
});



module.exports = router;
