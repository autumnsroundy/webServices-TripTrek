const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Check for required environment variables
if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
  console.error('Missing MongoDB connection string in environment variables');
  console.log('Please set MONGO_URI or MONGODB_URI in your Render environment variables');
  process.exit(1);
}

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
app.use(cors());
app.use(express.json());

// === MongoDB Connection ===
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// === Basic route ===
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello, TripTrek!',
    documentation: '/api-docs',
    status: 'Server is running'
  });
});

// === Health check route for Render ===
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// === Use routers for REST endpoints ===
app.use('/users', usersRouter);
app.use('/trips', tripsRouter);
app.use('/destinations', destinationsRouter);
app.use('/activities', activitiesRouter);

// === 404 handler ===
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});