const express = require("express");
const { getCommentsOnArticle } = require("../controllers/comments.controllers");

const commentsRouter = express.Router();

/* commentsRouter.route('')
    .get(getCommentsOnArticle);
 */
module.exports = { commentsRouter };
