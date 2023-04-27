import models from "./../db/config/models.js";
import sessionDAO from './sessionDAO.js';

class productsDAO extends sessionDAO {
    constructor () {
        super()
    }

    async getProducts () {
        let data;

        data = await models.products.find({}, {_id:0, __v:0});

        const stringifyData = JSON.stringify(data);
        const parsedData = JSON.parse(stringifyData);

        return parsedData;
    }

    async getProductByCode (code) {
        let data;

        data = await models.products.find({code: code}, {_id:0, __v:0});

        const stringifyData = JSON.stringify(data);
        const parsedData = JSON.parse(stringifyData);

        return parsedData;
    }

    async addProductMongo (prod) {
        prod = {...prod, cantidad: 1}
        
        const newprod = new models.products(prod);
        await newprod.save();
        
    }
}

export default productsDAO