import models from "./../db/config/models.js";
import productsDAO from "./productsDAO.js";

class messagesDAO extends productsDAO {
    constructor () {
        super()
    }

    async getMsg () {
        let data;

        data = await models.messages.find({}, {_id:0, __v:0});

        const stringifyData = JSON.stringify(data);
        const parsedData = JSON.parse(stringifyData);

        return parsedData;
    }

    async addMsgMongo (mensaje) {
        const newuser = new models.messages(mensaje);
        await newuser.save();
    }
}

export default messagesDAO