const db = require("../db/connection");

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
