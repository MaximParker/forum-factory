const {
  selectAllArticles,
  selectArticleByID,
  updateArticleVotes,
} = require("../models/articles.models");

const { lookupTopics } = require("../utils/utils");

exports.getArticles = (req, res, next) => {
  lookupTopics()
    .then((topics) => {
      return selectAllArticles(
        req.query.sort_by,
        req.query.order,
        req.query.topic,
        topics
      )
    })
    .then(({ rows }) => {
      res.status(200).send({ articles: rows });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleByID = (req, res, next) => {
  selectArticleByID(req.params.article_id, topics)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleByID = (req, res, next) => {
  updateArticleVotes(req.params.article_id, req.body)
    .then(({ rows }) => {
      if (rows.length === 0) {
        res.status(404).send({ msg: "Not Found" });
      }
      res.status(201).send({ article: rows[0] });
    })
    .catch((err) => {
      next(err);
    });
};
