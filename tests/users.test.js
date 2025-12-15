const request = require("supertest");
const express = require("express");
const usersRoutes = require("../routes/users");
const mockAuth = require("./middleware/mockAuth");

const app = express();
app.use(express.json());
app.use(mockAuth(global.mockUser));
app.use("/users", usersRoutes);

describe("Users API", () => {
  const testUser = {
    userName: "testuser",
    firstName: "Joseph",
    lastName: "Smith",
    email: "joesmith@byui.edu",
    password: "mypassword"
  };

  it("GET /users → should return all users", async () => {
    const res = await request(app).get("/users/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /users → should create a new user", async () => {
    const res = await request(app).post("/users/").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.userName).toBe(testUser.userName);
  });

  it("GET /users/:username → should get a user by username", async () => {
    const res = await request(app).get(`/users/${testUser.userName}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.userName).toBe(testUser.userName);
  });

  it("PUT /users/:username → should update a user", async () => {
    const res = await request(app)
      .put(`/users/${testUser.userName}`)
      .send({ firstName: "JosephUpdated", lastName: "Smith", email: testUser.email });
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("JosephUpdated");
  });

  it("DELETE /users/:username → should delete a user", async () => {
    const res = await request(app).delete(`/users/${testUser.userName}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deletion Successful");
  });
});
