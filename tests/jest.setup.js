const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "jest_test_db" // optional: separate test DB
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); // cleans test DB
  await mongoose.connection.close();
});
