const { selectCommentsByID, insertCommentByArticleID, deleteCommentByID } = require("../models/comments.models");

exports.getCommentsOnArticle = (req, res, next) => {
  selectCommentsByID(req.params.article_id)
    .then(({ rows }) => {
      const formattedArr = rows.map(({ article_id, ...rest }) => rest);
      res.status(200).send({ comments: formattedArr });
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
  .then((result) => {
    if (result == undefined) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    res.status(204).send();
  })
  .catch((err) => {
    next(err);
  })
};