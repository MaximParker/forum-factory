const {
  selectAllArticles,
  selectArticleByID,
  updateArticleVotes,
  updateArticleBody
} = require("../models/articles.models");

const { lookupTopics, validateArticleID } = require("../utils/utils");

exports.getArticles = (req, res, next) => {
  lookupTopics()
    .then((topics) => {
      return selectAllArticles(
        req.query.sort_by,
        req.query.order,
        req.query.topic,
        topics
      );
    })
    .then(({ rows }) => {
      res.status(200).send({ articles: rows });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleByID = (req, res, next) => {
  selectArticleByID(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleByID = (req, res, next) => {
  return validateArticleID(req.params.article_id)
    .then(() => {
      const { patch } = req.query;

      if (patch == "votes") {
        return updateArticleVotes(req.params.article_id, req.body);
      } else if (patch == "body") {
        return updateArticleBody(req.params.article_id, req.body);
      } else {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }
    })
    .then(({ rows }) => {
      res.status(201).send({ article: rows[0] });
    })
    .catch((err) => {
      next(err);
    });
};
