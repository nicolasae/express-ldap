const authMiddleware = (req, res, next) => {
    if (!req.session.infoUserLogged) {
        return res.redirect('login');
        
    } 
    next();
}

module.exports = authMiddleware;