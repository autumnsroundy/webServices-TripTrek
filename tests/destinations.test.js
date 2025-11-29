const request = require("supertest");
const app = require("../app");

describe("Destinations API", () => {

  let destId;
  const testDestination = {
    tripTitle: "Anniversary Trip",
    locationName: "Cancun",
    notes: ["Beach", "Relax"]
  };

  it("GET /destinations → should return all destinations", async () => {
    const res = await request(app).get("/destinations/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /destinations → should create a destination", async () => {
    const res = await request(app).post("/destinations/").send(testDestination);
    destId = res.body._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.locationName).toBe(testDestination.locationName);
  });

  it("GET /destinations/:id → should get destination by ID", async () => {
    const res = await request(app).get(`/destinations/${destId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(destId);
  });

  it("PUT /destinations/:id → should update destination", async () => {
    const res = await request(app).put(`/destinations/${destId}`).send({ locationName: "Updated Cancun" });
    expect(res.statusCode).toBe(200);
    expect(res.body.locationName).toBe("Updated Cancun");
  });

  it("DELETE /destinations/:id → should delete destination", async () => {
    const res = await request(app).delete(`/destinations/${destId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deletion Successful");
  });

});
