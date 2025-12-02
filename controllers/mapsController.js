const utilities = require("../utilities/index");
const mapsController = {};

mapsController.buildMaps = async function(req, res){
  const nav = await utilities.getNav()
  res.render('googleMaps/maps', {title: "Maps", nav})
};

module.exports = mapsController;