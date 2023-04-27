import path from 'path';

export class sessionController {
    loginFunction (req, res) {
        res.status(200).sendFile(path.resolve('public/pages/login.html'))
    }
    
    failloginFunction (req, res) {
        res.status(403).sendFile(path.resolve('public/pages/login-error.html'))
    }
    
    registerFunction (req, res) {
        res.status(200).sendFile(path.resolve('public/pages/register.html'))
    }
    
    failregisterFunction (req, res) {
        res.status(403).sendFile(path.resolve('public/pages/register-error.html'))
    }

    redirectDatos (req, res) {
        res.redirect('/products')
    }

    datosFunction (req, res) {
        res.status(200).sendFile(path.resolve('public/pages/datos.html'))
    }
    
    getdataFunction (req, res) {
        res.status(200).send({user: req.user, contador: req.session.contador})
    }

    logoutFunction (req, res) {
        req.session.destroy();
        res.redirect('/')
    }
}