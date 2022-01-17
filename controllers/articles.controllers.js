const { selectArticleByID } = require("../models/articles.models");

exports.getArticleByID = (req, res, next) => {
    console.log("## CONTROLLER: getArticleByID...");
  selectArticleByID(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
