const db = require("../db/connection");
const format = require("pg-format");

exports.selectAllTopics = async () => {
  try {
    return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
      return rows;
    });
  } catch (err) {
    next(err);
  }
};
