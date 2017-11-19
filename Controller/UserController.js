'use strict';

 /**
 * Controller User
 * @module user
 */
 
 /**
 * @requires Controller
 */
const express = require("express");
const router = express.Router();
const User = require('../Model/user');
const jwt = require('jsonwebtoken');

/**
 * Route pour récupérer tous les utilisateurs.
 * @name /user
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.get('/', (req, res, next) => {
    User.find({}, function(err, users) {
      if (err) throw err;
      res.json(users);
    });
});

/**
 * Route pour récupérer un utilisateur.
 * @name /user
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, function(err, user) {
      if (err) throw err;
    
      // show the one user
      res.json(user);
    });
});

/**
 * Route pour ajouter un utilisateur (inscription).
 * @name /user
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.post('/', (req, res, next) => {
    console.log(req.body);
    let newUser = User(req.body);

// save the user
    newUser.save(function(err) {
      if (err) throw err;
      console.log('User created!');
      res.end();
    });
});

/**
 * Route pour se connecter.
 * @name /user
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.post('/login', (req, res, next) => {
    let id = req.body._id;
    let email = req.body.email;
    let password = req.body.password;
        User.find({'email' : email}, function(err, user) {
            if (user.length != 0) {
                let passwordInBdd = user[0].password;
                if (password == passwordInBdd) {
                    res.json({token : jwt.sign({email:user.email, lastname: user.lastname, firstname: user.firstname}, 'token genere')});
                } else {
                    res.json('Bad Email or Password');
                }
            } else {
                res.json('Bad Email or Password');
            }
    });
});

/**
 * Route pour supprimer un utilisateur.
 * @name /user
 * @param {string} path - Express path
 * @param {callback} middlewear - Express middlewear.
 */
router.delete('/:id', (req, res, next) => {
    User.findByIdAndRemove(req.params.id, function(err) {
      if (err) throw err;
      console.log('User deleted!');
      res.end();
    });
});

 /**
 * Export des routes
 */
module.exports.router = router;