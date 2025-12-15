require('dotenv').config();
require('./authentication/passport'); // register Passport strategies
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const staticRoute = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const tripRoutes = require('./routes/trips');
const activityRoutes = require('./routes/activities');
const destinationsRoutes = require('./routes/destinations');

const baseController = require('./controllers/baseController');
const mapsController = require('./controllers/mapsController');
const utilities = require('./utilities');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretkey',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout');
app.locals.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use(staticRoute);

app.get('/', utilities.handleErrors(baseController.buildHome));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/maps', utilities.handleErrors(mapsController.buildMaps));

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/debug-api-key', (req, res) => {
  res.json({
    keyPresent: !!process.env.GOOGLE_MAPS_API_KEY,
    keyLength: process.env.GOOGLE_MAPS_API_KEY?.length || 0,
    keyStartsWith: process.env.GOOGLE_MAPS_API_KEY?.substring(0, 6) || 'none',
    environment: process.env.NODE_ENV || 'development',
    renderUrl: 'https://webservices-triptrek-xyex.onrender.com'
  });
});

app.use((req, res) => {
  console.error(`404 Error at: "${req.originalUrl}"`);
  res.status(404).json({ error: 'Route not found' });
});

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  const message = err.status === 404 ? err.message : 'Server Error';
  res.render('errors/errors', {
    title: err.status || 'Server Error',
    message,
    nav
  });
});

module.exports = app;
