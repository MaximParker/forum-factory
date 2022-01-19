const express = require('express')
const {  } = require('../controllers/comments.controllers');

const commentsRouter = express.Router();

commentsRouter.route('')
    .get(getCommentsOnArticle)

module.exports = { articlesRouter }