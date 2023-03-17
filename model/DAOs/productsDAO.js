import models from "./../db/config/models.js";
import sessionDAO from './sessionDAO.js';
import options from './../db/connection.js';

class productsDAO extends sessionDAO {
    constructor () {
        super()
    }

    async getProducts () {
        await options.connect()

        let data;

        data = await models.products.find({}, {_id:0, __v:0});

        const stringifyData = JSON.stringify(data);
        const parsedData = JSON.parse(stringifyData);

        await options.disconnect()

        return parsedData;
    }

    async addProductMongo (prod) {
        await options.connect()

        const newprod = new models.products(prod);
        await newprod.save();
        
        await options.disconnect()
    }
}

export default productsDAO