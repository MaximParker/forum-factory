const db = require("../db/connection");
const format = require("pg-format");
const { lookupArticleByID, lookupCommentsByID } = require("../db/utils");

exports.selectArticleByID = async (id) => {
  try {
    console.log("## MODEL: selectArticleByID...");
    const result = await Promise.all([
      lookupArticleByID(id),
      lookupCommentsByID(id),
    ]);
    return { ...result[0].rows[0], comment_count: result[1].rows.length }
  } catch (err) {
    next(err);
  }
};
