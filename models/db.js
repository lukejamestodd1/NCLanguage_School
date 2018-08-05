var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);

// for dev mode
mongoose.connect('mongodb://localhost/newcentury', { useMongoClient: true });
