const request = require("supertest");
const app = require("../app/app.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("0. GET /notARoute", () => {
  it("responds with status: 404 for invalid route", () => {
    return request(app)
      .get("/notARoute")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            msg: "Invalid URL",
          })
        );
      });
  });
});

describe("1. GET /api", () => {
  test("status:200, responds with an object of endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(require("../app/endpoints.json"));
      });
  });
});
