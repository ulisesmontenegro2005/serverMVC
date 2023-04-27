import factoryDAO from './../model/DAOs/factoryDAO.js';
import { productsService } from './productsService.js';
const DAOs = factoryDAO.get();

export class messagesService extends productsService {
    constructor() {
        super()
    }

    async getMsgs () {
        return await DAOs.getMsg()
    }
    
    async addMsg (msg) {
        await DAOs.addMsgMongo(msg)
    } 
}