const db = require("../db/connection");
const format = require("pg-format");

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
  const validOrderArrangements = ["ASC", "DESC", "asc", "desc"];

  if (!validOrderCriteria.includes(orderCriterion)) {
    orderCriterion = "created_at";
  }

  if (!validOrderArrangements.includes(orderArrangement)) {
    orderArrangement = "DESC";
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
    orderCriterion,
    orderArrangement
  );

  return db.query(queryStr);
};

exports.selectArticleByID = (id) => {
  console.log("MODEL: selectArticleByID")
  return db.query(`
    SELECT articles.*, COUNT(comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    ;`,
    [id])
  .then(
    (result) => {
      console.log(result.rows[0])
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return result.rows[0];
    }
  );
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
