require("dotenv").config();
const models = require('../models/models');
const Util = {};

Util.getNav = async function (req, res, next) {
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    list += '<li><a href="/maps" title="View Google Maps">Maps</a></li>'
    list += '<li><a href="/api-docs" title="View Swagger Documentation">Swagger</a></li>'
    list += "</ul>"
    return list
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util