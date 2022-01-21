const express = require("express");
const { removeComment, patchComment } = require("../controllers/comments.controllers");

const commentsRouter = express.Router();

commentsRouter.route('/:comment_id')
    .delete(removeComment)
    .patch(patchComment);

module.exports = commentsRouter;
