const db = require("../db/connection.js");

exports.validateArticleID = (id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1;', [id])
  .then(({rows}) => {

    if (isNaN(id)) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }

    if (rows.length == 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return true
  })
};

exports.validateCommentID = (id) => {
  return db.query('SELECT * FROM comments WHERE comment_id = $1;', [id])
  .then(({rows}) => {
    if (isNaN(id)) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
    if (rows.length == 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return true
  })
};

exports.validateUsername = (username) => {
  return db.query('SELECT * FROM users WHERE username = $1;', [username])
  .then(({rows}) => {
    if (!isNaN(username)) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
    if (rows.length == 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return true
  })
};

exports.lookupTopics = () => {
  return db.query('SELECT slug FROM topics;')
  .then(({rows}) => {
    return rows.map((entry) => entry.slug)
  })
};