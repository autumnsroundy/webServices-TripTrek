const request = require("supertest");
const app = require("../app");

describe("Trips API", () => {

  let tripId;
  const testTrip = {
    userName: "tripuser",
    tripTitle: "Anniversary Trip",
    startDate: "01/01/2030",
    endDate: "01/10/2030",
    description: "Vacation!",
    totalCost: 2000
  };

  it("GET /trips → should return all trips", async () => {
    const res = await request(app).get("/trips/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /trips → should create a trip", async () => {
    const res = await request(app).post("/trips/").send(testTrip);
    tripId = res.body._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.tripTitle).toBe(testTrip.tripTitle);
  });

  it("GET /trips/:id → should get trip by ID", async () => {
    const res = await request(app).get(`/trips/${tripId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(tripId);
  });

  it("PUT /trips/:id → should update trip", async () => {
    const res = await request(app).put(`/trips/${tripId}`).send({ tripTitle: "Updated Trip" });
    expect(res.statusCode).toBe(200);
    expect(res.body.tripTitle).toBe("Updated Trip");
  });

  it("DELETE /trips/:id → should delete trip", async () => {
    const res = await request(app).delete(`/trips/${tripId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deletion Successful");
  });

});
