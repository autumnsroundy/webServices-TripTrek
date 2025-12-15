const request = require("supertest");
const express = require("express");
const tripsRoutes = require("../routes/trips");
const mockAuth = require("./middleware/mockAuth");

const app = express();
app.use(express.json());
app.use(mockAuth(global.mockUser));
app.use("/trips", tripsRoutes);

describe("Trips API", () => {
  let tripId;

  const testTrip = {
    tripTitle: "Anniversary Trip",
    startDate: "2030-01-01",
    endDate: "2030-01-10",
    description: "Vacation!",
    totalCost: 2000
  };

  it("POST /trips → should create a trip", async () => {
    const res = await request(app).post("/trips/").send(testTrip);
    tripId = res.body._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.tripTitle).toBe(testTrip.tripTitle);
    expect(res.body.userName).toBe(global.mockUser.userName);
  });

  it("GET /trips → should return trips for user", async () => {
    const res = await request(app).get("/trips/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].userName).toBe(global.mockUser.userName);
  });

  it("GET /trips/:id → should get trip by ID", async () => {
    const res = await request(app).get(`/trips/${tripId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(tripId);
  });

  it("PUT /trips/:id → should update trip", async () => {
    const res = await request(app)
      .put(`/trips/${tripId}`)
      .send({ tripTitle: "Updated Trip" });
    expect(res.statusCode).toBe(200);
    expect(res.body.tripTitle).toBe("Updated Trip");
  });

  it("DELETE /trips/:id → should delete trip", async () => {
    const res = await request(app).delete(`/trips/${tripId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deletion Successful");
  });
});
