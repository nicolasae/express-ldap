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
    const {username , password} = req.body
    const localEmail = `${username}@utp.edu.co`;

    if (username == '' || password == '') {
        res.render('login');
        return;
    }
    else {
        try {    
            const infoUser = await models.User.findOne({ where: { email: localEmail } });
            
            if (infoUser && infoUser.active == true) {

                const checkUserLdap = await authLdap(username,password);
                if ( checkUserLdap !== "Invalid Credentials" ){
                    let response = {
                        'identification' : checkUserLdap.numerodocumento,
                        'role': infoUser.idRole == 1 ? 'Super Administrador' : 'Administrador',
                        ...infoUser.dataValues
                    }
                    req.session.infoUserLogged = response
                    res.redirect('/admin');
                }else {        
                    res.render('login',{mensaje:'Las credenciales son inválidas'})
                    // res.status(401).json({'message': 'LDAP: El usuario no se encuentra registrado'})
                }
                
            } else {
                // res.status(401).json({'message':`El usuario ${username} no se encuentra registrado o activo en el aplicativo`});
                res.render('login',{mensaje:'Las credenciales son inválidas'})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
};


module.exports = {
    authenticationLogin,
};
