const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('Dummy test :)', () => {
    test('Dummy test :D', () => {
        console.log("TEST: hi :)")
    });
});