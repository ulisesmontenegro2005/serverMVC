import { factoryController } from './../controller/factoryController.js'
const controller = factoryController.get();
import middleware from '../middleware/middleware.js'
import express from 'express';
const productsRouter = express.Router();

productsRouter.get('/products', middleware.requireAuthentication, controller.datosFunction);
productsRouter.get('/products/:code', middleware.requireAuthentication, controller.getProductByCode)
productsRouter.get('/get-products', middleware.requireAuthentication, controller.getProducts)

productsRouter.post('/products/:code', middleware.requireAuthentication, controller.addProductCart)

productsRouter.delete('/products/:code', middleware.requireAuthentication, controller.deleteProductCart)

export default productsRouter;