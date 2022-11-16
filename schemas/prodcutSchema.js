const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(25);
const price = Joi.number().min(0);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name,
  price,
  image
});

const getProductSchema = Joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
