const tokenService = require('../services/token')

// Ensure the exist of the user's token 
const checkUser = async( req, res, next ) =>{
    console.log(req.headers.token)
    if ( !req.headers.token) {
        return res.status(404).send({
            message:'No token'
        })
    }
    const response = await tokenService.decode(req.headers.token)
    next()
}

module.exports = {
    checkUser,
}