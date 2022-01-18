const db = require("../db/connection");
const format = require("pg-format");
const { lookupArticleByID, lookupCommentsByID } = require("../utils/articles.utils");

exports.selectAllArticles = async () => {
  try {
    return db.query('SELECT * FROM articles;');
  } catch (err) {
    next(err); 
  }
}

exports.selectArticleByID = async (id) => {
  try {
    return await Promise.all([lookupArticleByID(id), lookupCommentsByID(id)]);
  } catch (err) {
    next(err); 
  }
};
