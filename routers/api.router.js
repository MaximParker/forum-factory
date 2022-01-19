const express = require('express')
const { topicsRouter } = require('./topics.router')
const { commentsRouter } = require('./comments.router')
const { articlesRouter } = require('./articles.router')

const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);


module.exports = { apiRouter }