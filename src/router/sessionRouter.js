import { factoryController } from './../controller/factoryController.js'
const controller = factoryController.get();
import passport from '../controller/passportController.js';
import middleware from '../middleware/middleware.js';
import express from 'express';
const sessionRouter = express.Router();

sessionRouter.get('/logout', controller.logoutFunction);
sessionRouter.get('/', controller.redirectDatos);
sessionRouter.get('/login', middleware.reqUserAutentication, controller.loginFunction);
sessionRouter.get('/faillogin', controller.failloginFunction);
sessionRouter.get('/register', middleware.reqUserAutentication, controller.registerFunction);
sessionRouter.get('/failregister', controller.failregisterFunction);
sessionRouter.get('/get-data', middleware.fetchUser, controller.getdataFunction);

sessionRouter.post('/login', passport.loginPassport)
sessionRouter.post('/register', passport.registerPassport)

export default sessionRouter;