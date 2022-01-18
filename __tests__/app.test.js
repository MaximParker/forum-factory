const request = require("supertest");

const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
  describe("GET", () => {
    test('Responds 200 with array of topics in an object with key of topics, each with correct attribute types', () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).toHaveLength(3);
          body.topics.forEach((entry) => {
            expect(entry).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
});

describe.only('/api/articles', () => {
  describe('GET', () => {
    test('Returns 200 with an array of all articles, nested in key "articles"', () => {
      return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({body}) => {
        expect(body).toEqual("Hi :)")
      })
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test('Responds 200 with an article object and correct data', () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            article: {
              article_id: 1,
              title: "Living in the shadow of a great man",
              topic: "mitch",
              author: "butter_bridge",
              body: "I find this existence challenging",
              created_at: "2020-07-08T23:00:00.000Z",
              votes: 100,
              comment_count: 11,
            },
          });
        });
    });
    test('Responds 404 for non-existent article_ID', () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test('Responds 400 for invalid article_ID (e.g. non-numerical string)', () => {
      return request(app)
        .get("/api/articles/banananas")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
  });
  describe("PATCH", () => {
    test('Responds 201 with updated article', () => {
      const updateBody = { inc_votes: 100 };

      return request(app)
        .patch("/api/articles/1")
        .send(updateBody)
        .expect(201)
        .then(({ body }) => {
          expect(body.article.votes).toEqual(200);
        });
    });
  });
});
