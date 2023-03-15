const { authenticate } = require("ldap-authentication");

const ldapConnection = require("../database/config/ldap.js");
const models = require('../database/models');

// Authentication with LDAP
const authLdap = async (username, password) => {
    let options = {
        ldapOpts: {
            url: ldapConnection.url,
        },
        adminDn: ldapConnection.adminDn,
        adminPassword: ldapConnection.adminPassword,
        userPassword: password,
        userSearchBase: ldapConnection.userSearchBase,
        usernameAttribute: ldapConnection.usernameAttribute,
        username: username,
    };

    let ldapAuthResponse
    try {
        ldapAuthResponse = await authenticate(options);

    } catch (error) {
        ldapAuthResponse = error.lde_message
        
    }
    return ldapAuthResponse;
};

// Validate credentials User
const authenticationLogin = async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const localEmail = `${username}@utp.edu.co`;
    
    try {
        
        const infoUser = await models.User.findOne({ where: { email: localEmail } });

        if (infoUser) {

            const checkUserLdap = await authLdap(username,password);
            if ( checkUserLdap !== "Invalid Credentials" ){
                console.log(infoUser)
                res.status(200).json(infoUser)
                
            }else {                
                res.status(401).json({'message': 'LDAP: El usuario no se encuentra registrado'})
            }
            
        } else {
            res
                .status(404)
                .send(
                    `El usuario ${username} no se encuentra registrado en el aplicativo`
                );
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error interno");
    }
};


module.exports = {
    authenticationLogin,
};
