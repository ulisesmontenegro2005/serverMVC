import bcrypt from 'bcrypt';
import factoryDAO from '../model/DAOs/factoryDAO.js';
const DAOs = factoryDAO.get();

const infoObject = async () => {
    return {
        argsEntrada: process.argv,
        sistema: process.platform,
        node: process.versions.node,
        memoriaReservada: process.memoryUsage().rss,
        pathExec: process.execPath,
        pid: process.pid,
        carpetaProyecto: process.argv[1].split('/')[6]
    }
}

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
    return DAOs.getProducts()
}

const addProduct = async (prod) => {
    await DAOs.addProductMongo(prod)
}

export default {
    infoObject,
    getUser,
    createUser,
    comparePassword,
    completeUserByUsername,
    getMsgs,
    addMsg,
    getProducts,
    addProduct
}