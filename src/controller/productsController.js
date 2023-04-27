import { sessionController } from './sessionController.js';
import { factoryService } from '../service/factoryService.js';
const service = factoryService.get();

export class productsController extends sessionController {
    constructor() {
        super()
    }

    async getProducts (req, res) {
        const products = await service.getProducts()
        res.status(200).json({'products': products})
    }
    
    async getProductByCode (req, res) {
        const {code} = req.params; 
        const product = await service.getProductByCode(code)
        res.status(200).json({'product': product})
    }
}