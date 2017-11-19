'use strict';

 /**
 * Controller Pizza
 * @module pizza
 */
 
 /**
 * @requires Controller
 */
const express = require("express");
const router = express.Router();
const Pizza = require('../Model/pizza');
//const expressJWT = require('express-jwt');

/**
 * Route pour récupérer toute les pizzas.
 * @name /pizza
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.get('/', (req, res, next) => {
    Pizza.find({}, function(err, pizzas) {
      if (err) throw err;
      res.json(pizzas);
    });
});

/**
 * Route pour récupérer une pizza
 * @name /pizza
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.get('/:id', (req, res, next) => {
    Pizza.findOne({_id: req.params.id}).populate('ingredients').exec((err, pizza) => {
      if (err) throw err;
      // show the one pizza
      res.json(pizza);
    });
  });

/**
 * Route pour ajouter une pizza
 * @name /pizza
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.post('/', (req, res, next) => {
    console.log(req.body);
    if(!req.body._id) {
      delete req.body._id;
    }
    
    let newPizza = Pizza(req.body);

    newPizza.save(function(err) {
      if (err) throw err;
      console.log('Pizza created!');
      global.io.emit('new pizza', newPizza);
      res.json(newPizza);
    });
});

/**
 * Route pour supprimer une pizza
 * @name /pizza
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.delete('/:id', (req, res, next) => {
    Pizza.findByIdAndRemove(req.params.id, function(err) {
      if (err) throw err;
      console.log('Pizza deleted!');
      //global.io.emit('delete pizza', Pizza);
      res.end();
    });
});

/**
 * Route pour modifier une pizza
 * @name /pizza
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.put('/:id', (req, res, next) => {
  var id = req.params.id,
       body = req.body;
  
  Pizza.findByIdAndUpdate(id, body, function(error, pizza) {
    // Handle the error using the Express error middleware
    if(error) return next(error);
    
    // Render not found error
    if(!pizza) {
      return res.status(404).json({
        message: 'Pizza with id ' + id + ' can not be found.'
      });
    }
    //global.io.emit('update pizza', Pizza);
    res.json(pizza);
  });
});

 /**
 * Export des routes
 */
module.exports.router = router;