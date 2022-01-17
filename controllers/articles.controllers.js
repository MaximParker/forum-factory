const { selectArticleByID } = require("../models/articles.models");

exports.getArticleByID = (req, res, next) => {
  selectArticleByID(req.params.article_id)
    .then((result) => {
      // For non-existent articles...
      if (result[0].rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      // For successful requests...
      res.status(200).send({
        article: {
          ...result[0].rows[0],
          comment_count: result[1].rows.length,
        },
      });
    })
    .catch((err) => {
      next(err);
    });
};
