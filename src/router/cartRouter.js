import { factoryController } from './../controller/factoryController.js'
const controller = factoryController.get();
import middleware from '../middleware/middleware.js'
import express from 'express';
const cartRouter = express.Router();

cartRouter.get('/get-products-cart', middleware.requireAuthentication, controller.getProductsCart)
cartRouter.get('/cart', middleware.requireAuthentication, controller.cartFunction)

cartRouter.post('/order', middleware.requireAuthentication, controller.order)

export default cartRouter;