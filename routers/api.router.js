const express = require('express')
const { topicsRouter } = require('./topics.router')
const { articlesRouter } = require('./articles.router')

const apiRouter = express.Router();

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter)

module.exports = { apiRouter }