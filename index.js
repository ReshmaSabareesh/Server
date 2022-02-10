const express = require('express');
const cors = require('cors');
const ArticleInfo = require('./src/model/BlogDB');
const userdata = require('./src/model/User') ;
const path = require ('path');

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.static('./build/)'));
// Post Method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic Article Fetch Route
app.get('/api/article/:name', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
        const articleName = req.params.name;
        ArticleInfo.findOne({ name: articleName })
            .then(function (article) {
                res.status(200).json(article);
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
});

// Upvotes Routing
app.post('/api/article/:name/upvotes', (req, res) => {
    const articleName = req.params.name;
    const filter = { name: articleName };
    const update = { $inc: { upvotes: 1 } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})

// Comments Routing
app.post('/api/article/:name/comments', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const filter = { name: articleName };
    const update = { $push: { comments: { username, text } } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})


app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Port number
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} `);
})