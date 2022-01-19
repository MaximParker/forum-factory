const express = require('express')
const { getArticles, getArticleByID, patchArticleByID } = require('../controllers/articles.controllers');

const articlesRouter = express.Router();

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsOnArticle)

articlesRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleByID)

module.exports = { articlesRouter }