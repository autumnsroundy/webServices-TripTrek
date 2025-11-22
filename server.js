const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// === Import models ===
const { User, Trip, Destination, Activity } = require('./models/models');

// === Import route files ===
const usersRouter = require('./routes/users');
const tripsRouter = require('./routes/trips');
const destinationsRouter = require('./routes/destinations');
const activitiesRouter = require('./routes/activities');

// === Swagger setup ===
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// === Middleware ===
app.use(cors()); // handles CORS headers
app.use(express.json());

// Optional: custom header for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// === Basic route ===
app.get('/', (req, res) => {
  res.send('Hello, TripTrek!');
});

// === Use routers for REST endpoints ===
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/destinations', destinationsRouter);
app.use('/activities', activitiesRouter);

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
