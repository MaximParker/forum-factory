const db = require("../db/connection.js");

exports.lookupArticleByID = async (id) => {
  try {
    console.log("UTILS: lookupArticleByID:", id)
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [id]);
  }
  catch (err) {
    next(err);
  }
};

exports.lookupCommentsByID = (id) => {
  try {
    console.log("UTILS: lookupCommentsByID:", id)
    return db.query(`SELECT * FROM comments WHERE article_id = $1;`, [id]);
  }
  catch (err) {
    next(err);
  }
};
