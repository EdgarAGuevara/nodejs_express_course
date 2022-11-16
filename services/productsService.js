
const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 1000;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  };

  async find() {
    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find(itme => itme.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex(itme => itme.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const productToChange = this.products[index];
    this.products[index] = {
      ...productToChange,
      ...data
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(itme => itme.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };

  }

}

module.exports = ProductsService;
