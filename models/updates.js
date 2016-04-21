var mongoose = require('mongoose');  
var updateSchema = new mongoose.Schema({  
  text: String
});
module.exports = mongoose.model('Update', updateSchema);