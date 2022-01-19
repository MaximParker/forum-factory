const express = require("express");
const { removeComment } = require("../controllers/comments.controllers");

const commentsRouter = express.Router();

commentsRouter.route('/:comment_id')
    .delete(removeComment);

module.exports = { commentsRouter };
