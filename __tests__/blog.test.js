const request = require("supertest");
const app = require("../app");

describe("GET /blogs", () => {
  it("should return a list of blogs", async () => {
    const response = await request(app).get("/blogs");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

