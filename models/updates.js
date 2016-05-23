var mongoose = require('mongoose');  
var updateSchema = new mongoose.Schema({  
	title: String,
  text: String
});
module.exports = mongoose.model('Update', updateSchema);