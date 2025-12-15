const mongoose = require("mongoose");
require("dotenv").config();
const { User } = require("../models/models");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "jest_test_db" });
  await User.deleteMany({});

  global.mockUser = await User.create({
    userName: "jestuser",
    firstName: "Jest",
    lastName: "Tester",
    email: "jest@byui.edu",
    password: "password123"
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});
