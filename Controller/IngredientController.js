'use strict';

 /**
 * Controller Ingredient
 * @module ingredient
 */
 
 /**
 * @requires Controller
 */
const express = require("express");
const router = express.Router();
const Ingredient = require('../Model/ingredient');

/**
 * Route pour récupérer tous les ingredients.
 * @name /ingredient
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.get('/', (req, res, next) => {
    Ingredient.find({}, function(err, ingredients) {
      if (err) throw err;
      res.json(ingredients);
    });
});

/**
 * Route pour récupérer un ingredient.
 * @name /ingredient
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.get('/:id', (req, res, next) => {
    Ingredient.findById(req.params.id, function(err, ingredient) {
      if (err) throw err;
    
      // show the one ingredient
      res.json(ingredient);
    });
});

/**
 * Route pour ajouter un ingredient.
 * @name /ingredient
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.post('/', (req, res, next) => {
    let newIngredient = Ingredient(req.body);

// save the ingredient
    newIngredient.save(function(err) {
      if (err) throw err;
      console.log('Ingredient created!');
      global.io.emit('new ingredient', newIngredient);
      res.json(newIngredient);
    });
});

/**
 * Route pour supprimer un ingredient.
 * @name /ingredient
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.delete('/:id', (req, res, next) => {
    Ingredient.findByIdAndRemove(req.params.id, function(err) {
      if (err) throw err;
      console.log('Ingredient deleted!');
      //global.io.emit('delete ingredient', Ingredient);
      res.end();
    });
    
});

/**
 * Route pour modifier un ingredient.
 * @name /ingredient
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.put('/:id', (req, res, next) => {
  var id = req.params.id,
       body = req.body;
  
  Ingredient.findByIdAndUpdate(id, body, function(error, ingredient) {
    // Handle the error using the Express error middleware
    if(error) return next(error);
    
    // Render not found error
    if(!ingredient) {
      return res.status(404).json({
        message: 'Ingredient with id ' + id + ' can not be found.'
      });
    }

    global.io.emit('update ingredient', ingredient);
    res.json(ingredient);
  });
});

 /**
 * Export des routes
 */
module.exports.router = router;