const { selectAllArticles, selectArticleByID, updateArticleVotes } = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  selectAllArticles()
  .then((result) => {
    res.status(200).send("Hi :)")
  })
}

exports.getArticleByID = (req, res, next) => {
  selectArticleByID(req.params.article_id)
    .then((result) => {
      res.status(200).send({
        article: {
          ...result[0].rows[0],
          comment_count: result[1].rows.length,
        }
      });
    })
    .catch((err) => {
      console.log("CONTROLLER:", err)
      next(err);
    });
};

exports.patchArticleByID = (req, res, next) => {
  updateArticleVotes(req.params.article_id)
  .then((result) => {
    console.log
    console.log(result)
  })
  .catch((err) => {
    next(err);
  })
}
