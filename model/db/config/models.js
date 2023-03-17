import mongoose from 'mongoose';

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
    author: {
        id: String,
        nombre: String,
        apellido: String,
        edad: Number,
        alias: String,
        icon: String
    },
    text: String,
    hora: String
})

const messages = mongoose.model(messagesCollection, messagesSchema);

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
        name: String,
        stock: Number,
        url: String
})

const products = mongoose.model(productsCollection, productsSchema);

export default {
    messages,
    products
}


