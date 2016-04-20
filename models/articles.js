var mongoose = require('mongoose');  
var articleSchema = new mongoose.Schema({  
  title: String,
  text: String,
  image_url: String
});
mongoose.model('Article', articleSchema);