import models from "./../db/config/models.js";
import options from './../db/connection.js';
import productsDAO from "./productsDAO.js";

class messagesDAO extends productsDAO {
    constructor () {
        super()
    }

    async getMsg () {
        await options.connect()

        let data;

        data = await models.messages.find({}, {_id:0, __v:0});

        const stringifyData = JSON.stringify(data);
        const parsedData = JSON.parse(stringifyData);

        await options.disconnect()

        return parsedData;
    }

    async addMsgMongo (mensaje) {
        await options.connect()

        const newuser = new models.messages(mensaje);
        await newuser.save();

        await options.disconnect()
    }
}

export default messagesDAO