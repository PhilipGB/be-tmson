const request = require("supertest");
const app = require("../app/app.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("1. GET /api/users", () => {
  it("responds with status: 200 and a json object containing all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            users: expect.any(Array),
          })
        );

        expect(body.users[0]).toEqual({
          user_id: expect.any(Number),
          username: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String),
          bio: expect.any(String),
          birth_date: expect.any(String),
          avatar_url: expect.any(String),
          address: expect.any(String),
          postcode: expect.any(String),
          email_address: expect.any(String),
          minter: expect.any(Boolean),
        });
      });
  });
});

describe("2. GET /api/users/:username", () => {
  test("status:200, responds with an object of username", () => {
    return request(app)
      .get("/api/users/fthynne0")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          user: {
            user_id: expect.any(Number),
            username: "fthynne0",
            first_name: "Felice",
            last_name: "Thynne",
            birth_date: "1930-10-15T00:00:00.000Z",
            avatar_url:
              "https://robohash.org/exercitationemillumlibero.png?size=50x50&set=set1",
            address: "2 Melrose Point",
            postcode: "BD7",
            email_address: "fthynne0@wordpress.org",
            bio: "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
            minter: false,
          },
        });
      });
  });
  test("status:404, username not found", () => {
    return request(app)
      .get("/api/users/NO_USER")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "No user found for NO_USER" });
      });
  });
});

describe("3. POST /api/users/", () => {
  test("status:201, responds with new user", () => {
    const newUser = {
      username: "TestUser",
      first_name: "Test",
      last_name: "User",
      birth_date: "2000-01-01T00:00:00.000Z",
      avatar_url:
        "https://robohash.org/exercitationemillumlibero.png?size=50x50&set=set1",
      address: "2 Test Place",
      postcode: "T3 5TS",
      email_address: "TestUser@wordpress.org",
      bio: "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      minter: false,
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toEqual({
          user_id: expect.any(Number),
          ...newUser,
        });
      });
  });
  test("status:405, request body missing", () => {
    const newUser = {
      username: "butter_bridge",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid request body");
      });
  });
});
