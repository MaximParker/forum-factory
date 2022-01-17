const request = require("supertest");

const app = require('../app')
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/topics', () => {
    describe('GET', () => {
        test(`Responds 200 with array of topics in an object with key of 'topics', each with the correct types of attributes`, () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                expect(body.topics).toHaveLength(3);
                body.topics.forEach((entry) => {
                    expect(entry).toEqual(
                      expect.objectContaining({
                        slug: expect.any(String),
                        description: expect.any(String)
                      })
                    );
                  });
            })
        });
    });
});

describe('/api/articles/:article_id', () => {
    describe('GET', () => {
        test.only(`Responds 200 with an article object with the correct types of attributes`, () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual({
                    title: 'Living in the shadow of a great man',
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'I find this existence challenging',
                    created_at: Date(1594329060000),
                    votes: 100,
                    comment_count: 11
                })
            })
        });
    });
});
