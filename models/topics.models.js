const db = require("../db/connection");
const format = require("pg-format");

console.log("## In model...");

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
