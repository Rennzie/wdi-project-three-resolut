//BACK END ROUER

const express = require('express');
const Router = express.Router();

//Controllers
const eventController = require('../controllers/eventController');


//Secure Route Middleware


//=== ROUTES ===//

// AUTH ROUTES


// EVENT ROUTES
Router.route('/events')
  .get(eventController.index)
  .post(eventController.create);     // NOTE: we will secure this route

Router.route('/events/:id')
  .get(eventController.show)
  .put(eventController.update)      // NOTE: we will secure this route
  .delete(eventController.delete);  // NOTE: we will secure this route

// GOAL ROUTES


// USER ROUTES




module.exports = Router;
