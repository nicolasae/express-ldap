const jwt = require('jsonwebtoken');

const db = require("../models");
// create main Model
const User = db.users;

const checkToken = async( token ) =>  {
    let localId = null
    try {
        const { userId } = await jwt.decode(token)
        localId = userId
    }
    catch ( error ) {
        return false
    }
    const  user = await User.findOne({ where: { id: localId } });
    if (user) {
        const token = encode(user);
        return token;
    } else {
        return false;
    }
}



const encode = async (localIdUser, localEmail) => {
    
    let token;

    try {
        token = jwt.sign(
            { userId: localIdUser, email: localEmail },
            "my_secret_key",
            { expiresIn: "1h" }
        );

        const response = {
            token      
        }
        return response

    } catch (err) {
        const response =  {
            status: 500,
            message:'Ha ocurrido un error durante la creación del token de autenticación',
        }
        return response
        // console.log("Ha ocurrido un error durante la creación del token de autenticación");
    }

};

const decode = async ( token ) => { 
    
    try {
        const { userId } = await jwt.verify(token, "my_secret_key")
        const  user = await User.findOne({ where: { id: userId } });
        
        return user
        

    }catch(error) {
        // console.log(error)
        const newToken = await checkToken(token)
        return newToken
    }
}


module.exports = {
    encode,
    decode,
};
