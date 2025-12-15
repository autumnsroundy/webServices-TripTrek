const request = require("supertest");
const express = require("express");
const activitiesRoutes = require("../routes/activities");
const mockAuth = require("./middleware/mockAuth");

const app = express();
app.use(express.json());
app.use(mockAuth(global.mockUser));
app.use("/activities", activitiesRoutes);

describe("Activities API", () => {
  let activityId;
  const testActivity = {
    tripTitle: "Anniversary Trip",
    locationName: "Cancun",
    activityName: "Parasailing",
    date: "2030-01-01",
    time: "2:00 PM EST",
    cost: 120
  };

  it("GET /activities → should return activities for logged-in user", async () => {
    const res = await request(app).get("/activities/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /activities → should create an activity", async () => {
    const res = await request(app).post("/activities/").send(testActivity);
    activityId = res.body._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.activityName).toBe(testActivity.activityName);
  });

  it("GET /activities/:id → should get activity by ID", async () => {
    const res = await request(app).get(`/activities/${activityId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(activityId);
  });

  it("PUT /activities/:id → should update activity", async () => {
    const res = await request(app).put(`/activities/${activityId}`).send({ activityName: "Updated Parasailing" });
    expect(res.statusCode).toBe(200);
    expect(res.body.activityName).toBe("Updated Parasailing");
  });

  it("DELETE /activities/:id → should delete activity", async () => {
    const res = await request(app).delete(`/activities/${activityId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Deletion Successful");
  });
});
