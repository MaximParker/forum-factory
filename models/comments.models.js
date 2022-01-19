const db = require("../db/connection");
const format = require("pg-format");
const { selectArticleByID } = require("../models/articles.models");

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
