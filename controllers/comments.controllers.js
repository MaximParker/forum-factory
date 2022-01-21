const { selectCommentsByID, insertCommentByArticleID, deleteCommentByID } = require("../models/comments.models");
const { validateCommentID } = require('../utils/utils')

exports.getCommentsOnArticle = (req, res, next) => {
  selectCommentsByID(req.params.article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentOnArticle = (req, res, next) => {
  insertCommentByArticleID(req.params.article_id, req.body)
  .then((result) => {
    res.status(201).send({ comment: result });
  })
  .catch((err) => {
    next(err);
  })
};

exports.removeComment = (req, res, next) => {
  deleteCommentByID(req.params.comment_id)
  .then(() => {
    res.sendStatus(204)
  })
  .catch((err) => {
    next(err);
  })
};