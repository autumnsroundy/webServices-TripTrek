const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const env = require('dotenv').config()
const app = express();
const cors = require('cors');
const staticRoute = require('./routes/index')
const baseController = require('./controllers/baseController')
const utilities = require('./utilities/')
const session = require('express-session')
const bodyParser = require("body-parser")

// === Swagger ===
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mapsController = require('./controllers/mapsController');

// === Middleware ===
app.use(cors());
app.use(express.json());
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
});

// === Routes ===

// View Engine and Partials
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.use(staticRoute);
app.get('/', utilities.handleErrors(baseController.buildHome));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/maps', utilities.handleErrors(mapsController.buildMaps));
// Basic routes
// app.get('/', (req, res) => {
//   res.json({ message: 'Hello, TripTrek!', documentation: '/api-docs' });
// });
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.status(404).json({ error: 'Route not found A' });
});
/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Route Not Found B'}
  res.render('errors/errors', {
    title: err.status || 'Server Error',
    message,
    nav
  })
});

// === export app for tests ===
module.exports = app; 
