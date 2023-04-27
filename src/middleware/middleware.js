import service from './../service/service.js'

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(403).redirect('/login')
    }
}

function reqUserAutentication (req, res, next) {
    if (req.user) {
        return res.redirect('/products')
    } else{
        next()
    }
}

async function fetchUser (req, res, next) {
    if (!req.user) {
        return res.redirect('/')
    }

    const user = await service.getUser(req.session.passport.user);

    req.body.user = user

    next()
}

export default {
    requireAuthentication,
    reqUserAutentication,
    fetchUser
};