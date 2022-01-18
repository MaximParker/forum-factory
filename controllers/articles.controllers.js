const {
  selectAllArticles,
  selectArticleByID,
  updateArticleVotes,
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  selectAllArticles().then(({rows}) => {
    res.status(200).send({articles: rows});
  });
};

exports.getArticleByID = (req, res, next) => {
  selectArticleByID(req.params.article_id)
    .then((article) => {
      res.status(200).send({article});
    })
    .catch((err) => {
      console.log("CONTROLLER:", err);
      next(err);
    });
};
/* 
exports.patchArticleByID = (req, res, next) => {
  updateArticleVotes(req.params.article_id)
    .then((result) => {
      console.log;
      console.log(result);
    })
    .catch((err) => {
      next(err);
    });
};
 */