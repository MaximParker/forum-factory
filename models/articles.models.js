const db = require("../db/connection");
const format = require("pg-format");
const { lookupArticleByID, lookupCommentsByID} = require("../utils/articles.utils");

exports.selectAllArticles = () => {
    return db.query('SELECT * FROM articles;');
}

exports.selectArticleByID = (id) => {
  return Promise.all([lookupArticleByID(id), lookupCommentsByID(id)])
    .then((aggregateData) => {
      if (aggregateData[0].rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" })
      }
      return {
        ...aggregateData[0].rows[0],
        comment_count: aggregateData[1].rows.length
      }
    })
};

exports.updateArticleVotes = (id, votesModifier) => {
  return db.query(
    `UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;`,
    [id, votesModifier]);
}