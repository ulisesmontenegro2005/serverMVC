import express from 'express';
import controller from '../controller/controller.js';
import passport from '../controller/passport.js';
import middleware from '../middleware/middleware.js'

const router = express.Router();

router.get('/', controller.redirectDatos);
router.get('/login', middleware.reqUserAutentication, controller.loginFunction);
router.get('/faillogin', controller.failloginFunction);
router.get('/register', middleware.reqUserAutentication, controller.registerFunction);
router.get('/failregister', controller.failregisterFunction);
router.get('/logout', controller.logoutFunction);
router.get('/get-data', middleware.fetchUser, controller.getdataFunction);
router.get('/get-products', middleware.requireAuthentication, controller.getProducts)
router.get('/get-products-cart', middleware.requireAuthentication, controller.getProductsCart)

router.get('/products', middleware.requireAuthentication, controller.datosFunction);
router.get('/products/:code', middleware.requireAuthentication, controller.getProductByCode)
router.get('/cart', middleware.requireAuthentication, controller.cartFunction)
router.post('/products/:code', middleware.requireAuthentication, controller.addProductCart)
router.delete('/products/:code', middleware.requireAuthentication, controller.deleteProductCart)

router.post('/login', passport.loginPassport)
router.post('/register', passport.registerPassport)

router.post('/order', middleware.requireAuthentication, controller.order)

export default router;