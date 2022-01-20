const db = require("../db/connection.js");

exports.lookupArticleByID = (id) => {
};

exports.lookupCommentsByID = async (id) => {
  const lookup = await db.query(
    `SELECT * FROM comments WHERE article_id = $1;`,
    [id]
  );
  return lookup;
};
