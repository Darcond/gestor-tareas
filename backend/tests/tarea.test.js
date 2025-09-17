const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Tarea = require("../src/models/Tarea");
const User = require("../src/models/User");

let token;

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
  await User.deleteMany({});
  await Tarea.deleteMany({});

  const user = await User.create({ username: "taskuser", password: "123456" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ username: "taskuser", password: "123456" });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Tarea endpoints", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/api/tareas")
      .set("Authorization", `Bearer ${token}`)
      .send({ titulo: "Prueba", descripcion: "Test", prioridad: "alta" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.titulo).toBe("Prueba");
  });

  it("should require a title", async () => {
    const res = await request(app)
      .post("/api/tareas")
      .set("Authorization", `Bearer ${token}`)
      .send({ descripcion: "No title" });

    expect(res.statusCode).toBe(400);
  });
});
