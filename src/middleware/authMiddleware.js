const verifyCredentials = (req, res, next) => {
    if (!req.session.infoUserLogged) {
        return res.redirect('/login');
    } 
    next();
}

const verifySuperAdmin = (req,res,next) => {
    // console.log(req.session.infoUserLogged)
    if (req.session.infoUserLogged.idRole === 1) {
        next();
    }
    else {
        // res.status(403).json({'message':'Unauthorized'})
        res.redirect('/admin')
    }
}

module.exports = {
    verifyCredentials,
    verifySuperAdmin,
}