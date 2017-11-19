'use strict';

 /**
 * TestsController Pizza
 * @module pizza
 */
 
 /**
 * @requires TestsController
 */
const chai = require('chai');
const assert = chai.assert;
const https = require('https');
const querystring = require('querystring');
const chaiHttp = require('chai-http');
const Pizza = require('../Model/pizza');
const Ingredient = require('../Model/ingredient');
chai.use(chaiHttp);

const url = 'https://pizzaposey-marvyn.c9users.io';

describe('Test Pizza', () => {
  /** Test pour ajouter une pizza */
    it('should get a new pizza object', (done) => {
        let ingredient = new Ingredient({ name : 'ingredientTest', weight: 'weightTest', price:'priceTest' });
          ingredient.save().then((ingredient)=>{
          chai.request(url)
            .post('/pizza')
            .send({
                name: 'nomTest',
                desc: 'descTest',
                price: 10,
                picture: 'pictureTest',
                ingredients: [
                    ingredient._id
                    ]
            })
            .end((err, res, statusCode) => {
              if (err) done(err);
              assert.strictEqual(statusCode, 200);
              assert.typeOf(res, 'object');
              done()
          });
        });
    });
     /** Test pour modifier une pizza */
    it('should get an updated pizza object', () => {
        let pizza = new Pizza({ name: 'nomTest',
          desc: 'descTest',
          price: 10,
          picture: 'pictureTest',
          ingredients: [
              '5a0dac413135c7470bf0d2c3'
              ]});
          return pizza.save().then((pizza)=>{
            return chai.request(url)
                .put('/pizza'+pizza.id)
                .send({
              name: 'nomTest',
              desc: 'descTest',
              price: 12,
              picture: 'pictureTest',
              ingredients: [
                  '5a0dac413135c7470bf0d2c3'
                  ]
          })
            .end((err, res)=>{
                if(err) throw err;
              assert.strictEqual(statusCode, 200);
              assert.typeOf(res, 'object');
                
            })
            })
       /* pizza.save((err, pizza) => {
            chai.request(url)
              .put('/pizza/'+pizza.id)
              .send({
                  name: 'nomTest',
                  desc: 'descTest',
                  price: 12,
                  picture: 'pictureTest',
                  ingredients: [
                      '5a0dac413135c7470bf0d2c3'
                      ]
              })
              .end(function (err, res) {
                if (err) done(err);
                assert.typeOf(res, 'object');
                done();
            });
        });*/
    });
        /** Test pour supprimer une pizza */
        it('should get a deleted pizza object', (done) => {
        let pizza = new Pizza({ name: 'nomTest',
          desc: 'descTest',
          price: 10,
          picture: 'pictureTest',
          ingredients: [
              '5a0dac413135c7470bf0d2c3'
              ]});
        pizza.save((err, pizza) => {
            chai.request(url)
              .end(function (err, res) {
                if (err) done(err);
                assert.typeOf(res, 'object');
                done();
            });
        });
    });
     /** Test pour récupérer toute les pizzas */
    it('should get an array of pizzas', (done) => {
        chai.request(url).get('/pizza').end(function (err, res) {
            if (err) done(err);
            assert.isArray(res);
            done()
        });
    });
});