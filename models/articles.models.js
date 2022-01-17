const db = require("../db/connection");
const format = require("pg-format");
const { lookupArticleByID, lookupCommentsByID } = require("../db/utils");

exports.selectArticleByID = async (id) => {
  try {
      if (!parseInt(id)) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }
    
      return await Promise.all([lookupArticleByID(id), lookupCommentsByID(id)]);
  } catch (err) {
    next(err);
  }
};
