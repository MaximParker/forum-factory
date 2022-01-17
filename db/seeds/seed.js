const format = require("pg-format");
const db = require("../connection");

exports.seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  // 1. create tables
  console.log("## Seeding database . . .");

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
      slug VARCHAR(255) PRIMARY KEY,
      description VARCHAR(255)
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
      username VARCHAR(255) PRIMARY KEY,
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
      votes INT DEFAULT 0,
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
      votes INT DEFAULT 0,
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
    });
};
