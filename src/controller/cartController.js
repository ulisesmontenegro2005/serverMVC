import path from 'path';
import { productsController } from './productsController.js';
import { factoryService } from '../service/factoryService.js';
const service = factoryService.get();

export class cartController extends productsController {
    constructor() {
        super()
    }

    async getProductsCart (req, res) {
        const cart = await service.getProductsCartService(req.user);
        res.json({'cart': cart})
    }
    
    async addProductCart (req, res) {
        const { code } = req.params;
        service.addProductCartService(code, req.user)
        res.status(201).redirect('/products')
    }
    
    async deleteProductCart (req, res) {
        const { code } = req.params;
        service.deleteProductCartService(code, req.user)
        res.status(200).redirect('/cart')
    }
    
    async cartFunction (req, res) {
        res.sendFile(path.resolve('public/pages/cart.html'))
    }
    
    async order (req, res) {
        service.order(req.user)
        res.sendStatus(200)
    }
}