const mongoose = require("mongoose");
const { User } = require("../models/models");
const { MongoMemoryServer } = require("mongodb-memory-server");

beforeAll(async () => {
  const instance = await MongoMemoryServer.create();
  
  await mongoose.connect(instance.getUri(), { dbName: "jest_test_db" });
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
