import factoryDAO from './../model/DAOs/factoryDAO.js';
import { cartService } from './cartService.js';
const DAOs = factoryDAO.get();

export class productsService extends cartService {
    constructor() {
        super()
    }

    async getProducts () {
        return await DAOs.getProducts()
    }
    
    async getProductByCode (code) {
        return await DAOs.getProductByCode(code)
    }
}