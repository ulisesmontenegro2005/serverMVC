import messagesDAO from "./messagesDAO.js";
import models from "./../db/config/models.js";
import UserModel from "../db/sessions.js";

export class Cart extends messagesDAO {
    constructor () {
        super()
    }

    async getProductsCart(user) {
        const userVariable = await UserModel.find({'email': user.email})
        return userVariable[0].cart
    }

    async addProductCart(code, user) {
        const userCart = user.cart;
        let prod = await models.products.findOne({'code': code})
        const index = userCart.findIndex(el => el.code == prod.code);

        if (index !== -1) {
            userCart[index].cantidad += 1
        } else {
            userCart.push(prod)
        }

        await UserModel.updateOne({'email': user.email}, {'cart': userCart})
    }

    async deleteProductCart(code, user) {
        let userCart = user.cart;
        const p = userCart.find(el => el.code === code)

        if (p) {
            userCart = userCart.filter(el => el.code !== p.code)
        } else {
            return new Error('The product cant found.')
        }

        await UserModel.updateOne({'email': user.email}, {'cart': userCart})
    }

    async deleteCart(email) {
        await UserModel.updateOne({'email': email}, {'cart': []})
    }
}