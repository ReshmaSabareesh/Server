const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://reshmaer:Reshma1992@cluster0.fywmm.mongodb.net/article_details?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    name: String,
     email: String,
   password: String
});

var userdata = mongoose.model('user', articleSchema);

module.exports = userdata;