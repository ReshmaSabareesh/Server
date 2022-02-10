const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://reshmaer:Reshma1992@cluster0.fywmm.mongodb.net/article_details?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    name: String,
   title: String,
   description: String
});

var ArticleDesc = mongoose.model('articlelist', articleSchema);

module.exports = ArticleDesc;