var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
  title: String,
  text: String,
  image1_url: String,
  image2_url: String,
  image3_url: String,
  image4_url: String,
  image5_url: String
});
module.exports = mongoose.model('Article', articleSchema);
