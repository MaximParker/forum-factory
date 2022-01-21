const express = require('express')
const { getArticles, getArticleByID, patchArticleByID } = require('../controllers/articles.controllers');
const { getCommentsOnArticle, postCommentOnArticle } = require('../controllers/comments.controllers')

const articlesRouter = express.Router();

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleByID)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsOnArticle)
    .post(postCommentOnArticle)

module.exports = articlesRouter;