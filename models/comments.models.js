const db = require("../db/connection");
const format = require("pg-format");
const { validateArticleID } = require("../utils/utils");

exports.selectCommentsByID = (id) => {
  return validateArticleID(id)
  .then(() => {
    return db
      .query(
        `SELECT comment_id, votes, created_at, author, body
      FROM comments
      WHERE article_id = $1;`,
        [id]
      )
      .then(({ rows }) => {
        return rows;
      });
  });
};

exports.insertCommentByArticleID = (id, commentObject) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id)
          VALUES ($1, $2, $3)
          RETURNING *;
          `,
      [commentObject.username, commentObject.body, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteCommentByID = (id) => {
  return db
    .query(
      `DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *`,
      [id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
