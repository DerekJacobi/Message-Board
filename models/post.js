var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var postSchema = Schema({
  title: {type: String, required: true},
  post: {type: String, required: true},
  date: { type: Date, default: Date.now },
  comments: [],
  votes: {type: Number, default: 0}
});


var Post = mongoose.model('Post', postSchema);

module.exports = Post;
