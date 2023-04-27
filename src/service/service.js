import bcrypt from 'bcrypt';
import factoryDAO from './../model/DAOs/factoryDAO.js';
const DAOs = factoryDAO.get();

// USER FUNCTIONS

const getUser = async (username) => {
    return await DAOs.getUserDetails(username);
}

const completeUserByUsername = async (username) => {
    return await DAOs.getCompleteUser(username)
}

const createUser = async (obj) => {
    await DAOs.saveUser(obj);
    return obj
}

const comparePassword = async (pass1, pass2) => {
    return await bcrypt.compare(pass1, pass2);
}

// MESSAGE FUNCTIONS

const getMsgs = async () => {
    return await DAOs.getMsg()
}

const addMsg = async (msg) => {
    await DAOs.addMsgMongo(msg)
} 

// PRODUCT FUNCTIONS

const getProducts = async () => {
    return await DAOs.getProducts()
}

const getProductByCode = async (code) => {
    return await DAOs.getProductByCode(code)
}

// CART FUNCTIONS

const getProductsCartService = async (username) => {
    return await DAOs.getProductsCart(username)
}

const addProductCartService = async (code, user) => {
    await DAOs.addProductCart(code, user)
}

const deleteProductCartService = async (code, user) => {
    await DAOs.deleteProductCart(code, user)
}

// ORDER FUNCTION

const order = async (user) => {
    await DAOs.makeOrder(user)
}

export default {
    order,
    getProductByCode,
    getProductsCartService,
    deleteProductCartService,
    addProductCartService,
    getUser,
    createUser,
    comparePassword,
    completeUserByUsername,
    getMsgs,
    addMsg,
    getProducts
}