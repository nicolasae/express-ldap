const jwt = require('jsonwebtoken');

// Creating jwt token
const createToken = async (localIdUser, localEmail) => {
    
    let token;
    try {
        token = jwt.sign(
            { userId: localIdUser, email: localEmail },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );

        const response = {
            succes: true,
            data:{
                userId: localIdUser,
                email:localEmail,
                token: token
            }
        }
        return response

    } catch (err) {
        console.log("Ha ocurrido un error durante la creación del token de autenticación");
    }

};

module.exports = {
    createToken,
};
