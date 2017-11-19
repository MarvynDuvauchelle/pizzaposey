'use strict';

 /**
 * Schéma Pizza
 * @module pizza
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @class PizzaSchema
 * @param {String} name - Nom de la pizza (Requis)
 * @param {String} desc - Courte description accrocheur de la pizza (Requis)
 * @param {Number} price - Prix de la pizza (Requis)
 * @param {Array} ingredients - Liste des ingredients (Requis)
 * @param {String} picture - Image de la pizza stocké en base 64
 * @param {Date} create_at - Date de création
 * @param {Date} update_at - Date de mise à jour
 * @return {Schema}
 */
let pizzaSchema = new Schema({
    name                : { type: String, uniq: true, required: true },
    desc                : { type: String, required: true },
    price               : { type: Number, required: true },
    ingredients         : [{ type: Schema.Types.ObjectId, ref: 'ingredient', required: true }],
    picture             : { type: String },
    create_at           : { type: Date, default: Date.now },
    updated_at          : { type: Date, default: Date.now},
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Met à jour la date de la propriété update_at
 */
pizzaSchema.pre('findOneAndUpdate', function(next) {
    this._update.update_at = Date.now();
  next();
});

 /**
 * Export schéma pizza
 */
let Pizza = mongoose.model('pizza', pizzaSchema);
module.exports = Pizza;