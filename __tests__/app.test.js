const request = require("supertest");

const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed.js");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
  describe("GET", () => {
    test("Responds 200 with array of topics in an object with key of topics, each with correct attribute types", () => {
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

describe("/api/articles", () => {
  describe("GET", () => {
    test('Returns 200 with an array of all articles, nested in key "articles"', () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toHaveLength(12);
          body.articles.forEach((entry) => {
            expect(entry).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String),
              })
            );
          });
        });
    });
    test("Returns a list sorted in descending date order by default", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("Returns a list sorted by the sort_by query (descending by default)", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("author", {
            descending: true,
          });
        });
    });
    test("Returns a list arranged according to the order query", () => {
      return request(app)
        .get("/api/articles?order=ASC")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            ascending: true,
          });
        });
    });
    test("Returns a list filtered by the given topic query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          body.articles.forEach((entry) => {
            expect(entry).toEqual(
              expect.objectContaining({
                topic: "mitch",
              })
            );
          });
        });
    });
    test("Returns 400 for invalid sort_by query", () => {
      return request(app)
        .get("/api/articles?sort_by=not_a_real_sort_query")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
    test("Returns 400 for invalid order query", () => {
      return request(app)
        .get("/api/articles?order=not_a_real_order_query")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
    test("Returns 404 for non-existent topic query", () => {
      return request(app)
        .get("/api/articles?topic=not_a_real_topic_query")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Returns 200 and an empty array for a valid topic query with no associated articles", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toEqual([]);
        });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("Responds 200 with an article object and correct data", () => {
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
              comment_count: "11",
            },
          });
        });
    });
    test("Responds 404 for non-existent article_ID", () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Responds 400 for invalid article_ID (e.g. non-numerical string)", () => {
      return request(app)
        .get("/api/articles/not-a-real-article")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
  });

  describe("PATCH", () => {
    test("Responds 400 for missing query", () => {
      const updateBody = { inc_votes: 100 };

      return request(app)
        .patch("/api/articles/99999?patch=votes")
        .send(updateBody)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Responds 400 for invalid query", () => {
      const updateBody = { inc_votes: 100 };

      return request(app)
        .patch("/api/articles/99999?patch=asdfsadfgsadf")
        .send(updateBody)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });

    describe("/api/articles/:article_id?patch=votes", () => {
      test("Responds 201 with updated article for 'patch=votes' query", () => {
        const updateBody = { inc_votes: 100 };

        return request(app)
          .patch("/api/articles/1?patch=votes")
          .send(updateBody)
          .expect(201)
          .then(({ body }) => {
            expect(body.article.votes).toEqual(200);
          });
      });
      test("Responds 404 for non-existent article_ID", () => {
        const updateBody = { inc_votes: 100 };

        return request(app)
          .patch("/api/articles/99999?patch=votes")
          .send(updateBody)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toEqual("Not Found");
          });
      });
      test("Responds 400 for invalid article_ID (e.g. non-numerical string)", () => {
        const updateBody = { inc_votes: 100 };
        return request(app)
          .patch("/api/articles/not-a-real-article?patch=votes")
          .send(updateBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toEqual("Bad Request");
          });
      });
      test("Responds 422 for missing attribute in request body", () => {
        const badBody = {};

        return request(app)
          .patch("/api/articles/1?patch=votes")
          .send(badBody)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).toEqual("Unprocessable Entity");
          });
      });
      test("Responds 422 for invalid inc_votes value in request body", () => {
        const badBody = { inc_votes: "banana" };

        return request(app)
          .patch("/api/articles/1?patch=votes")
          .send(badBody)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).toEqual("Unprocessable Entity");
          });
      });
      test("Responds 422 for presence of invalid attribute(s) in request body", () => {
        const badBody = { inc_votes: 10, monkey: "wrench" };

        return request(app)
          .patch("/api/articles/1?patch=votes")
          .send(badBody)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).toEqual("Unprocessable Entity");
          });
      });
    });
    describe("/api/articles/:article_id?patch=body", () => {
      test("Responds 201 with updated article for 'patch=body' query", () => {
        const updateBody = { newBody: "I really enjoy it" };

        return request(app)
          .patch("/api/articles/1?patch=body")
          .send(updateBody)
          .expect(201)
          .then(({ body }) => {
            expect(body.article.body).toEqual(updateBody.newBody);
          });
      });
      test("Responds 404 for non-existent article_ID", () => {
        const updateBody = { newBody: "I really enjoy it" };

        return request(app)
          .patch("/api/articles/99999?patch=body")
          .send(updateBody)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toEqual("Not Found");
          });
      });
      test("Responds 400 for invalid article_ID (e.g. non-numerical string)", () => {
        const updateBody = { newBody: "I really enjoy it" };
        return request(app)
          .patch("/api/articles/not-a-real-article?patch=body")
          .send(updateBody)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toEqual("Bad Request");
          });
      });
      test("Responds 422 for missing attribute in request body", () => {
        const badBody = {};

        return request(app)
          .patch("/api/articles/1?patch=body")
          .send(badBody)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).toEqual("Unprocessable Entity");
          });
      });
      test("Responds 422 for invalid newBody value in request body", () => {
        const badBody = { newBody: true };

        return request(app)
          .patch("/api/articles/1?patch=body")
          .send(badBody)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).toEqual("Unprocessable Entity");
          });
      });
      test("Responds 422 for presence of invalid attribute(s) in request body", () => {
        const badBody = { newBody: 10, monkey: "wrench" };

        return request(app)
          .patch("/api/articles/1?patch=body")
          .send(badBody)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).toEqual("Unprocessable Entity");
          });
      });
    });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET", () => {
    test("Responds 200 with array of desired comment data, nested in an object", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toHaveLength(11);
          body.comments.forEach((entry) => {
            expect(entry).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("Responds 200 with an empty array for articles with no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toHaveLength(0);
        });
    });
    test("Returns 400 for invalid article ID", () => {
      return request(app)
        .get("/api/articles/asdfhasdkfdsffgsdf/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
    test("Returns 404 for non-existent article ID", () => {
      return request(app)
        .get("/api/articles/99999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
  });
  describe("POST", () => {
    test("Responds 201 and returns the posted comment", () => {
      const commentObject = {
        username: "lurker",
        body: "10/10 would comment again",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(commentObject)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: 0,
              created_at: expect.any(String),
              author: "lurker",
              body: "10/10 would comment again",
            })
          );
        });
    });
    test("Responds 404 for non-existent article_id", () => {
      const commentObject = { username: "lurker", body: "ASDASGFASDGASDFDS" };
      return request(app)
        .post("/api/articles/99999/comments")
        .send(commentObject)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Responds 400 for invalid article_id", () => {
      const commentObject = { username: "lurker", body: "ASDASGFASDGASDFDS" };
      return request(app)
        .post("/api/articles/asdfasdfasfasfasdfasdf/comments")
        .send(commentObject)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
    test("Responds 422 for missing username in body properties", () => {
      const badCommentObj = { username: "lurker" };
      return request(app)
        .post("/api/articles/1/comments")
        .send(badCommentObj)
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).toEqual("Unprocessable Entity");
        });
    });
    test("Responds 422 for missing body in body properties", () => {
      const badCommentObj2 = { body: "hello" };
      return request(app)
        .post("/api/articles/1/comments")
        .send(badCommentObj2)
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).toEqual("Unprocessable Entity");
        });
    });
    test("Responds 404 for non-existent usernames", () => {
      const ghostComment = { username: "asdhsadhsadfh", body: "hello" };
      return request(app)
        .post("/api/articles/1/comments")
        .send(ghostComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Responds 201 while ignroing unnecessary body properties", () => {
      const strangeComment = {
        username: "lurker",
        body: "hello",
        favouriteFruit: "bananas",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(strangeComment)
        .expect(201);
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("DELETE", () => {
    test("Responds 204 and no content", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
        });
    });
    test("Actually removes the specified comment from the database", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(() => {
          return db
            .query("SELECT * FROM comments WHERE comment_id = 1;")
            .then(({ rows }) => {
              expect(rows).toEqual([]);
            });
        });
    });
    test("Responds 404 for a non-existent comment_id", () => {
      return request(app)
        .delete("/api/comments/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Responds 400 for invalid comment_id", () => {
      return request(app)
        .delete("/api/comments/asdfasdfasfasdf")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
  });

  describe("PATCH", () => {
    test("Responds 201 with updated comment", () => {
      const updateBody = { inc_votes: 99 };
      return request(app)
        .patch("/api/comments/5")
        .send(updateBody)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.votes).toEqual(99);
        });
    });
    test("Responds 404 for non-existent comment_id", () => {
      const updateBody = { inc_votes: 99 };
      return request(app)
        .patch("/api/comments/99999")
        .send(updateBody)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Responds 400 for invalid comment_id (e.g. non-numerical string)", () => {
      const updateBody = { inc_votes: 100 };
      return request(app)
        .patch("/api/comments/not-a-real-comment")
        .send(updateBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
    test("Responds 422 for missing attribute in request body", () => {
      const badBody = {};
      return request(app)
        .patch("/api/comments/1")
        .send(badBody)
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).toEqual("Unprocessable Entity");
        });
    });
    test("Responds 422 for invalid inc_votes value in request body", () => {
      const badBody = { inc_votes: "banana" };

      return request(app)
        .patch("/api/comments/1")
        .send(badBody)
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).toEqual("Unprocessable Entity");
        });
    });
    test("Responds 422 for presence of invalid attribute(s) in request body", () => {
      const badBody = { inc_votes: 10, monkey: "wrench" };

      return request(app)
        .patch("/api/comments/1")
        .send(badBody)
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).toEqual("Unprocessable Entity");
        });
    });
  });
});

describe("/api", () => {
  describe("GET", () => {
    test("Responds with a JSON object describing all available endpoints in the API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(endpoints);
        });
    });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("Responds 200 with an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toHaveLength(4);
          body.users.forEach((entry) => {
            expect(entry).toEqual(
              expect.objectContaining({
                avatar_url: expect.any(String),
                name: expect.any(String),
                username: expect.any(String),
              })
            );
          });
        });
    });
  });
});

describe("/api/users/:username", () => {
  describe("GET", () => {
    test("Responds 200 with a single user object", () => {
      return request(app)
        .get("/api/users/lurker")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toEqual({
            avatar_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            name: "do_nothing",
            username: "lurker",
          });
        });
    });
    test("Responds 404 for a nonexistent username", () => {
      return request(app)
        .get("/api/users/not-an-id")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not Found");
        });
    });
    test("Responds 400 for an invalid username", () => {
      return request(app)
        .get("/api/users/99999")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual("Bad Request");
        });
    });
  });
});
