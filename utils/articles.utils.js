const db = require("../db/connection.js");

exports.lookupArticleByID = async (id) => {
  const lookup = await db.query(
    `SELECT * FROM articles
      WHERE article_id = $1;`,
    [id]
  );
  return lookup;
};

exports.lookupCommentsByID = async (id) => {
  const lookup = await db.query(
    `SELECT * FROM comments WHERE article_id = $1;`,
    [id]
  );
  return lookup;
};
