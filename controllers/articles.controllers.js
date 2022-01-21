const {
  selectAllArticles,
  selectArticleByID,
  updateArticleVotes,
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
      const validQueries = ['votes']
      const { patch } = req.query;

      if (!patch || !validQueries.includes(patch)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }
      if (patch == 'votes') {
        return updateArticleVotes(req.params.article_id, req.body);
      }
    })
    .then(({ rows }) => {
      res.status(201).send({ article: rows[0] });
    })
    .catch((err) => {
      next(err);
    });
};
