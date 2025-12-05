require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('Missing MongoDB connection string in environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Google Maps API Key loaded:', process.env.GOOGLE_MAPS_API_KEY ? '✅' : '❌');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Docs: http://localhost:${PORT}/api-docs`);
        console.log(`Maps page: http://localhost:${PORT}/maps`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

  