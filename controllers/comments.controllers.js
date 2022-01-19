const { lookupCommentsByID } = require("../utils/articles.utils");
const { insertCommentByArticleID } = require("../models/comments.models");

exports.getCommentsOnArticle = (req, res, next) => {
  lookupCommentsByID(req.params.article_id)
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
    console.log("postCommentOnArticle:", result)
    res.status(201).send({ comment: result });
  })
  .catch((err) => {
    next(err);
  })
};
