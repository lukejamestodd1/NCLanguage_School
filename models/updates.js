var mongoose = require('mongoose');  
var updateSchema = new mongoose.Schema({  
  text: String
});
mongoose.model('Update', updateSchema);