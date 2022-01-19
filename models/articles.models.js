const db = require("../db/connection");
const format = require("pg-format");
const {
  lookupArticleByID,
  lookupCommentsByID,
} = require("../utils/articles.utils");

exports.selectAllArticles = (
  orderCriterion = "created_at",
  orderArrangement = "DESC",
  filterTopic
) => {
  const validOrderCriteria = [
    "article_id",
    "title",
    "topic",
    "created_at",
    "author",
    "votes",
    "body"
  ];
  const validOrderArrangements = ["ASC", "DESC"];

  if (!validOrderCriteria.includes(orderCriterion)) {
    orderCriterion = "created_at";
  }

  if (!validOrderArrangements.includes(orderArrangement)) {
    orderArrangement = "DESC";
  }

  let filterStr = '';
  if (filterTopic) {
    filterStr = format(`WHERE topic = '%s'`, filterTopic)
  }

  let queryStr = format(`SELECT * FROM articles
  %s
  ORDER BY %s %s`, filterStr, orderCriterion, orderArrangement);

  return db.query(queryStr);
};

exports.selectArticleByID = (id) => {
  return Promise.all([lookupArticleByID(id), lookupCommentsByID(id)]).then(
    (aggregateData) => {
      if (aggregateData[0].rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return {
        ...aggregateData[0].rows[0],
        comment_count: aggregateData[1].rows.length,
      };
    }
  );
};

exports.updateArticleVotes = (id, votesModifier) => {
  return db.query(
    `UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;`,
    [id, votesModifier]
  );
};
