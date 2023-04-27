import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { factoryService } from '../service/factoryService.js';
const service = factoryService.get();

passport.use('register', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const { user } = req.body;

    const email = await service.getUser(username);

    if (email) {
        return done(null, false, 'That user has already register')
    }

    const newUser = await service.createUser({username,password,user})

    done(null, newUser);
}))

passport.use('login', new LocalStrategy( async (username, password, done) => {

    let user = await service.completeUserByUsername(username)

    if (!user) {
        return done(null, false, 'This user not exist')
    }

    const isMatch = await service.comparePassword(password, user.password);
    if (!isMatch) return done(null, false, 'Incorrect password');

    user.username = username

    done(null, user)
}))

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
    const user = await service.getUser(username)

    done(null, user)
})

const loginPassport = passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/products' });

const registerPassport = passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'});

export default {
    loginPassport,
    registerPassport
}