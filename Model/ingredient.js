'use strict';

 /**
 * Schéma Ingredient
 * @module ingredient
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @class IngredientSchema
 * @param {String} name - Nom de l'ingredient (Requis)
 * @param {Number} weight - Poids de l'ingredient (Requis)
 * @param {Number} price - Prix de l'ingredient (Requis)
 * @param {Date} create_at - Date de création
 * @param {Date} update_at - Date de mise à jour
 * @return {Schema}
 */
const ingredientSchema = new Schema({
    name      : { type: String, uniq: true, required: true },
    weight    : { type: String, required: true },
    price     : { type: Number, required: true },
    create_at : { type: Date },
    update_at : { type: Date },
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Met à jour la date de la propriété update_at
 */
ingredientSchema.pre('findOneAndUpdate', function (next) {
  this._update.update_at = Date.now();
  next();
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Met à jour la date de la propriété created_at et updated_at
 */
ingredientSchema.pre('save', function(next) {
  this.update_at = Date.now();
  if (this.isNew) {
    this.create_at = this.update_at;
  }
  next();
});

/**
 * @function prefindOneAndRemove
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Met à jour les ingrédients
 */
ingredientSchema.pre('findOneAndRemove', function(next) {
  mongoose.model('pizza').update({}, { $pull: { ingredients: this._conditions._id }}, { multi: true }).exec();
  next();
});

 /**
 * Export schéma ingrédient
 */
let Ingredient = mongoose.model('ingredient', ingredientSchema);
module.exports = Ingredient;