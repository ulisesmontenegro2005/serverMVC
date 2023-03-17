import express from 'express';
import compression from 'compression';
import controller from './../controller/controller.js';
import passport from './../controller/passport.js';
import middleware from './../middleware/middleware.js'

const router = express.Router();

router.get('/', controller.redirectDatos);
router.get('/login', middleware.reqUserAutentication, controller.loginFunction);
router.get('/faillogin', controller.failloginFunction);
router.get('/register', middleware.reqUserAutentication, controller.registerFunction);
router.get('/failregister', controller.failregisterFunction);
router.get('/logout', controller.logoutFunction);
router.get('/datos', middleware.requireAuthentication, middleware.increaseCounter, controller.datosFunction);
router.get('/get-data', middleware.fetchUser, controller.getdataFunction);
router.get('/info', compression(), controller.infoFunction);

router.post('/login', passport.loginPassport)
router.post('/register', passport.registerPassport)

export default router;