const verifyCredentials = (req, res, next) => {
    // console.log('session en validador',req.session.infoUserLogged)
    if (!req.session.infoUserLogged) {
        return res.redirect('/login');
    } 
    next();
}

const verifySuperAdmin = (req,res,next) => {
    // console.log(req.session.infoUserLogged)

    if (!req.session.infoUserLogged) {
        return res.redirect('/login');
    } 
    else if (req.session.infoUserLogged.idRole === 1) {
        next();
    }
    else {
        res.redirect('/admin')
    }
}

module.exports = {
    verifyCredentials,
    verifySuperAdmin,
}