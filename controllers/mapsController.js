const utilities = require("../utilities/index");
require('dotenv').config(); // Asegura que las variables se carguen

const mapsController = {};

mapsController.buildMaps = async function(req, res) {
  try {
    const nav = await utilities.getNav();
    
    // 🔥 PASAMOS LA CLAVE - Nombre consistente: googleMapsApiKey
    const viewData = {
      title: "TripTrek Maps",
      nav,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    };
    
    console.log('✅ Maps Controller - Clave disponible:', 
      viewData.googleMapsApiKey ? 'SÍ' : 'NO');
    
    res.render('googleMaps/maps', viewData);
  } catch (error) {
    console.error('❌ Error en buildMaps:', error);
    throw error;
  }
};

module.exports = mapsController;