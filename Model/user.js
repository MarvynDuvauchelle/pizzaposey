'use strict';

 /**
 * Schéma User
 * @module user
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @class UserSchema
 * @param {String} pseudo - pseudo de l'utilisateur (Requis)
 * @param {String} firstname - prénom de l'utilisateur (Requis)
 * @param {Number} lastname - nom de l'utilisateur (Requis)
 * @param {String} email - Adresse email de l'utilisateur
 * @param {String} password - Mot de passe de l'utilisateur
 * @param {Date} create_at - Date de création
 * @param {Date} update_at - Date de mise à jour
 * @return {Schema}
 */
let userSchema = new Schema({
    pseudo              : { type: String, uniq: true, required: true },
    firstname           : { type: String, required: true },
    lastname            : { type: String, required: true },
    email               : { type: String, uniq: true, required: true },
    password            : { type: String, uniq: true, required: true },
    create_at           : { type: Date, default: Date.now }
});

 /**
 * Export schéma user
 */
let User = mongoose.model('user', userSchema);
module.exports = User;