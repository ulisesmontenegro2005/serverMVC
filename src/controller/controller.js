import path from 'path';
import service from './../service/service.js'

const redirectDatos = (req, res) => {
    res.redirect('/products')
}

const loginFunction = (req, res) => {
    res.status(200).sendFile(path.resolve('public/pages/login.html'))
}

const failloginFunction = (req, res) => {
    res.status(403).sendFile(path.resolve('public/pages/login-error.html'))
}

const registerFunction = (req, res) => {
    res.status(200).sendFile(path.resolve('public/pages/register.html'))
}

const failregisterFunction = (req, res) => {
    res.status(403).sendFile(path.resolve('public/pages/register-error.html'))
}

const datosFunction = (req, res) => {
    res.status(200).sendFile(path.resolve('public/pages/datos.html'))
}

const logoutFunction = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}

const getdataFunction = async (req, res) => {
    res.status(200).send({user: req.user, contador: req.session.contador})
}

const getProductsCart = async (req, res) => {
    const cart = await service.getProductsCartService(req.user);
    res.json({'cart': cart})
}

const addProductCart = async (req, res) => {
    const { code } = req.params;
    service.addProductCartService(code, req.user)
    res.status(201).redirect('/products')
}

const deleteProductCart = async (req, res) => {
    const { code } = req.params;
    service.deleteProductCartService(code, req.user)
    res.status(200).redirect('/cart')
}

const getProducts = async (req, res) => {
    const products = await service.getProducts()
    res.status(200).json({'products': products})
}

const getProductByCode = async (req, res) => {
    const {code} = req.params; 
    const product = await service.getProductByCode(code)
    res.status(200).json({'product': product})
}

const cartFunction = (req, res) => {
    res.sendFile(path.resolve('public/pages/cart.html'))
}

const order = (req, res) => {
    service.order(req.user)
    res.sendStatus(200)
}

export default {
    order,
    getProductByCode,
    getProductsCart,
    cartFunction,
    getProducts,
    deleteProductCart,
    addProductCart,
    redirectDatos,
    loginFunction,
    failloginFunction,
    registerFunction,
    failregisterFunction,
    datosFunction,
    logoutFunction,
    getdataFunction,
};