const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
  await User.deleteMany({});
  await User.create({ username: "testuser", password: "123456" });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth endpoints", () => {
  it("should login successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "wrongpass" });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("Credenciales incorrectas");
  });
});
