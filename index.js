
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogDB');

// Schema Setup
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/', (req, res) => {
  res.redirect('/posts');
});

// Routes
app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find({});
      res.render('index', { posts: posts });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const newPost = await Post.create({ title, content });
      res.redirect('/posts');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
// Server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
