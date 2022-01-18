const express = require('express')
const { getArticles, getArticleByID, patchArticleByID } = require('../controllers/articles.controllers');

const articlesRouter = express.Router();

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleByID)


//app.get('/api/articles/:article_id/comments', getArticleComments)
//app.post('/api/articles/:article_id/comments', postCommentOnArticle)
//app.delete('/api/comments/:comment_id', getArticleByID)
//app.get('/api')

module.exports = { articlesRouter }