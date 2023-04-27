import { Cart } from "./cartDAO.js";
import models from "./../db/config/models.js";
import { createTransport } from 'nodemailer';
import options from './../../../config.js'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: options.EMAIL,
        pass: options.EMAIL_PASS 
    }
});

export class OrdersDAO extends Cart {
    constructor() {
        super()
    }

    async makeOrder(user) {
        let total = 0
        let arrProds = []

        user.cart.forEach((el) => {
            total += (parseInt(el.price) * parseInt(el.cantidad))
            arrProds.push(`\n- Nombre: ${el.name}, Cantidad: ${el.cantidad}, Precio Unitario: ${el.price}`);
        })

        const newOrder = new models.orders({
            email: user.email,
            products: user.cart,
            price: total
        });
        await newOrder.save();

        const emailContent = {
            from: 'Confirmación de la Orden <noreply@example.com>',
            to: `${user.email}`,
            subject: 'Orden',
            text: `Confirmación de la orden, precio total: ${total}. Productos: ${arrProds.join(' ')}
            `,
        }

        try {
            const info = await transporter.sendMail(emailContent);
        } catch (error) {
            console.log(error);
        } finally {
            this.deleteCart(user.email)
        }
    }
}