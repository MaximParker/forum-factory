const format = require("pg-format");
const db = require("../connection");

exports.seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  // 1. create tables
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })

    .then(() => {
      return db.query(`
      CREATE TABLE topics (
      slug VARCHAR(255) PRIMARY KEY NOT NULL,
      description VARCHAR(255)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
      username VARCHAR(255) PRIMARY KEY ,
      avatar_url VARCHAR(255),
      name VARCHAR(255) NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      topic VARCHAR(255) REFERENCES topics (slug),
      author VARCHAR(255) REFERENCES users (username),
      created_at DATE DEFAULT CURRENT_TIMESTAMP
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(255) REFERENCES users (username),
      article_id INT REFERENCES articles (article_id),
      votes INT DEFAULT 0 NOT NULL,
      created_at DATE DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL
      );`);
    })

    // 2. insert data
    .then(() => {
      const queryStr = format(
        `INSERT INTO topics
        (slug, description)
        VALUES %L
        RETURNING *;`,
        topicData.map((topic) => [topic.slug, topic.description])
      );
      return db.query(queryStr)
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO users
        (username, name, avatar_url)
        VALUES %L
        RETURNING *;`,
        userData.map((user) => [user.username, user.name, user.avatar_url])
      );
      return db.query(queryStr)
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO articles
        (title, body, votes, topic, author, created_at)
        VALUES %L
        RETURNING *;`,
        articleData.map((article) => [article.title, article.body, article.votes, article.topic, article.author, article.created_at])
      );
      return db.query(queryStr)
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO comments
        (author, article_id, votes, created_at, body)
        VALUES %L
        RETURNING *;`,
        commentData.map((comment) => [comment.author, comment.article_id, comment.votes, comment.created_at, comment.body])
      );
      return db.query(queryStr)
    })
    ;
};
