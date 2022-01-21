const db = require("../db/connection");
const format = require("pg-format");
const { validateArticleID } = require("../utils/utils");

exports.selectAllArticles = (
  sortCriterion = "created_at",
  orderArrangement = "DESC",
  filterTopic,
  availableTopics
) => {
  const validOrderCriteria = [
    "article_id",
    "title",
    "topic",
    "created_at",
    "author",
    "votes",
    "body",
  ];
  const validOrderArrangements = ["ASC", "DESC", "asc", "desc"];

  if (!validOrderCriteria.includes(sortCriterion)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  if (!validOrderArrangements.includes(orderArrangement)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  if (filterTopic && !availableTopics.includes(filterTopic)) {
    return Promise.reject({ status: 404, msg: "Not Found" });
  }

  let filterStr = "";
  if (filterTopic) {
    filterStr = format(`WHERE topic = '%s'`, filterTopic);
  }

  let queryStr = format(
    `
    SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    %s
    GROUP BY articles.article_id
    ORDER BY %s %s;`,
    filterStr,
    sortCriterion,
    orderArrangement
  );
  return db.query(queryStr);
};

exports.selectArticleByID = (id) => {
  return validateArticleID(id)
    .then(() => {
      return db.query(
        `
    SELECT articles.*, COUNT(comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    ;`,
        [id]
      );
    })
    .then((result) => {
      return result.rows[0];
    });
};

exports.updateArticleVotes = (id, votesModifier) => {
  if (
    typeof votesModifier.inc_votes != "number" ||
    Object.keys(votesModifier) != "inc_votes"
  ) {
    return Promise.reject({ status: 422, msg: "Unprocessable Entity" });
  }

  return db.query(
    `UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;`,
    [id, votesModifier.inc_votes]
  );
};
