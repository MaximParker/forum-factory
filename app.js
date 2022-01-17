const express = require("express");
const app = express();
app.use(express.json());
const { getTopics } = require("./controllers/topics.controllers");
const { getArticleByID } = require("./controllers/articles.controllers");

// ENDPOINTS =====================================================

app.get("/api/topics", getTopics);

app.get('/api/articles/:article_id', getArticleByID);
//app.patch('/api/articles/:article_id', patchArticleByID)
//app.get('/api/articles/', getArticles)

//app.get('/api/articles/:article_id/comments', getArticleComments)
//app.post('/api/articles/:article_id/comments', postCommentOnArticle)
//app.delete('/api/comments/:comment_id', getArticleByID)
//app.get('/api')

// ERROR HANDLERS ================================================

// Custom error report
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

// Generic error report
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
