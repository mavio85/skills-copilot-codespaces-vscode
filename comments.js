// Create web server
// The server will be responsible for handling all requests
// and responses. It will be the middleman between the client
// and the database.

// Import the express module
const express = require('express');

// Import the body-parser module
const bodyParser = require('body-parser');

// Import the comments module
const comments = require('./comments');

// Create a new express application
const app = express();

// Set the port to 4001
const port = 4001;

// Use the body-parser module to parse the request body
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments.getComments());
});

// Add a new comment
app.post('/comments', (req, res) => {
  const { comment } = req.body;
  const newComment = comments.addComment(comment);
  res.status(201).send(newComment);
});

// Delete a comment
app.delete('/comments/:commentId', (req, res) => {
  const { commentId } = req.params;
  comments.deleteComment(commentId);
  res.status(204).send();
});

// Listen on port 4001
app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
