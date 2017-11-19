'use strict';
 /**
 * @module server
 */
 /**
 * @requires Server
 */
const path       = require('path');
const express    = require('express');
const app        = express();
const http       = require('http').Server(app);
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const colors     = require('colors');
const cors       = require('cors');

 /**
 * Innitialisation
 */
const port = process.env.PORT || 3000;

 /**
 * Mongoose
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pizzaposey', err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

 /**
 * Ecoute du serveur
 */
app.listen(port, () => {
    console.log(`Starting WebServer at ${port}`);
});

 /**
 * @requires Evênements
 */
const ServerEvent = require('./Controller/ServerEvent');

 /**
 * @requires Sockets
 */
require('./Controller/socket').listen(http, ServerEvent, colors);

 /**
 * Configurations générales
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist')));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 /**
 * @requires Controllers
 */
const Pizza = require ('./Controller/PizzaController.js');
const Ingredient = require ('./Controller/IngredientController.js');
const User = require ('./Controller/UserController.js');

// Conf Events Managements
//Pizza.pizzaEvent(ServerEvent);

 /**
 * Initialisation des routes
 */
app.use('/pizza', Pizza.router);
app.use('/ingredient', Ingredient.router);
app.use('/user', User.router);