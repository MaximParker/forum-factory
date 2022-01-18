const db = require("../db/connection");
const format = require("pg-format");
const { checkValidID, lookupArticleByID, lookupCommentsByID } = require("../utils/articles.utils");

exports.selectArticleByID = async (id) => {
  try {
    return await Promise.all([lookupArticleByID(id), lookupCommentsByID(id)]);
  } catch (err) {
    next(err); 
  }
};
