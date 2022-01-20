const db = require("../db/connection.js");

exports.lookupTopics = () => {
  return db.query('SELECT slug FROM topics;')
  .then(({rows}) => {
    return rows.map((entry) => entry.slug)
  })
  .catch((err) => {
    next(err);
  })
};

exports.lookupUsernames = () => {
  return db.query('SELECT usernames FROM users;')
  .then(({rows}) => {
    return rows.map((entry) => entry.username)
  })
  .catch((err) => {
    next(err);
  })
};