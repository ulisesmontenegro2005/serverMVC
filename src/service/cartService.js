import factoryDAO from './../model/DAOs/factoryDAO.js';
const DAOs = factoryDAO.get();

export class cartService {
    async getProductsCartService (username){
        return await DAOs.getProductsCart(username)
    }
    
    async addProductCartService (code, user){
        await DAOs.addProductCart(code, user)
    }
    
    async deleteProductCartService (code, user){
        await DAOs.deleteProductCart(code, user)
    }
    
    async order (user){
        await DAOs.makeOrder(user)
    }
}