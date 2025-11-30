const express = require('express');
const cors = require('cors');

// === Swagger ===
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes/index'));

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello, TripTrek!', documentation: '/api-docs' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app; // <- export app for tests
