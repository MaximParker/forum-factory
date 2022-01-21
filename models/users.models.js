const db = require("../db/connection");
const { validateUsername } = require("../utils/utils");

exports.selectAllUsers = () => {
  return db
    .query(`SELECT * FROM users;`)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      next(err);
    });
};

exports.selectUserByUsername = (username) => {
  return validateUsername(username)
    .then(() => {
      return db.query(`SELECT * FROM users WHERE username = $1;`, [username]);
    })
    .then(({ rows }) => {
      return rows[0];
    })
};