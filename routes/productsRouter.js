
const express = require('express');
const ProductsService = require('../services/productsService');
const { validatorHandler } = require('../middlerwares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/prodcutSchema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//The endpoint that have specifics params must be before that endpoint that have varaible params
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newProduct
    });
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const editedProduct = await service.update(id, body);
      res.json(editedProduct);
    } catch (error) {
      next(error);
    }
  });

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const editedProduct = await service.update(id, body);
    res.json(editedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await service.delete(id);
  res.json(deletedProduct);
});

module.exports = router;
