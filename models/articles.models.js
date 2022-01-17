const db = require("../db/connection");
const format = require("pg-format");
const { lookupArticleByID, lookupCommentsByID } = require("../db/utils");

exports.selectArticleByID = async (id) => {
  try {
    console.log("## MODEL: selectArticleByID...");
    return await Promise.all([lookupArticleByID(id), lookupCommentsByID(id)]);
  } catch (err) {
    next(err);
  }
};
