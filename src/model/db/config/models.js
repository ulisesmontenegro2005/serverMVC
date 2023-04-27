import mongoose from 'mongoose';

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
    author: {
        id: String,
        nombre: String,
        email: String
    },
    text: String,
    hora: String
})

const messages = mongoose.model(messagesCollection, messagesSchema);

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
        code: String,
        price: String,
        name: String,
        stock: Number,
        url: String,
        cantidad: Number
})

const products = mongoose.model(productsCollection, productsSchema);

const orderCollection = 'order';

const orderSchema = new mongoose.Schema({
        email: String,
        products: Array,
        price: Number
})

const orders = mongoose.model(orderCollection, orderSchema);

export default {
    orders,
    messages,
    products
}


