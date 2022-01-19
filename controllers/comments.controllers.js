const { selectCommentsByArticleID } = require("../models/comments.models");
const { lookupCommentsByID } = require("../utils/articles.utils");

exports.getCommentsOnArticle = (req, res, next) => {
  lookupCommentsByID(req.params.article_id)
  .then(({ rows }) => {
    const formattedArr = rows.map(({article_id, ...rest}) => rest);
    res.status(200).send({ comments: formattedArr });
  });
};
