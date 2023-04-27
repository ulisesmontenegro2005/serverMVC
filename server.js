import express from 'express'
import session from 'express-session'
import passport from 'passport';
import compression from 'compression';
import { Server }  from 'socket.io';
import { createServer } from 'http';
import config from './config.js';
import router from './src/router/router.js';
import service from './src/service/service.js';
import options from './src/model/db/connection.js'

const app = express();
options.connect();

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
    cookie:{
        maxAge:36000000
        },
    secret: 'secret',
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize())
app.use(passport.session())

// ROUTER

app.use('/', router);
app.get("*", (req, res) => {
    res.json(  {"error":`la ruta no existe: ${req.url}`} )
});

// SOCKET

const httpServer = new createServer(app);
const io = new Server(httpServer, {});

io.on('connection', async socket => {
    console.log('New user connected');

        socket.emit('products', await service.getProducts());
        socket.on('update-products', async data => {
            await service.addProduct(data)
            io.sockets.emit('products', await service.getProducts());
        })

        socket.emit('messages', await service.getMsgs())
        socket.on('update-chat', async data => {
            await service.addMsg(data)
            io.sockets.emit('messages', await service.getMsgs())
        })

        socket.emit('cart')
        socket.on('update-cart', async () => {
            io.sockets.emit('cart')
        })
})

// LISTENING

httpServer.listen(config.PORT, () => {
    console.log(`Listening in port: ${config.PORT}`);
})