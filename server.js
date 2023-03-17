import express from 'express'
import session from 'express-session'
import { engine as exphbs } from 'express-handlebars'
import passport from 'passport';
import { Server }  from 'socket.io';
import { createServer } from 'http';
import config from './config.js';
import router from './router/router.js';
import service from './service/service.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
    cookie:{
        maxAge:60000
        },
    secret: 'secret',
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }))
app.set('views', './public/views');
app.set('view engine', '.hbs')

// ROUTER

app.use('/', router);

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
})

// LISTENING

httpServer.listen(config.PORT, () => {
    console.log(`Listening in port: ${config.PORT}`);
})