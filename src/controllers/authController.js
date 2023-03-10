const { response } = require("express");
const { authenticate } = require("ldap-authentication");
const dbConfig = require("../config/ldapConfig.js");

const { users } = require("../models");

const db = require("../models");

// create main Model
const User = db.users;

// Authentication with LDAP
const auth = async (username, password) => {
    let options = {
        ldapOpts: {
            url: dbConfig.url,
        },
        adminDn: dbConfig.adminDn,
        adminPassword: dbConfig.adminPassword,
        userPassword: password,
        userSearchBase: dbConfig.userSearchBase,
        usernameAttribute: dbConfig.usernameAttribute,
        username: username,
    };

    try {
        const ldapAuthResponse = await authenticate(options);

        return ldapAuthResponse

    } catch (error) {
        console.log(error);
    }

};

// Validate credentials User
const authAdmin = async (req, res) => {
    
    let username = req.body.user;
    let localEmail = `${username}@utp.edu.co`;
    let password = req.body.password;

    try {

        const infoUser = await User.findOne({ where: { correo: localEmail } });

        if(infoUser){
            if(infoUser.admin) {
                const checkUserLdap = await auth(username, password);
                res.status(200).send(JSON.stringify(checkUserLdap));
            }else{
                res.status(200).send(`El usuario ${username} no es administrador en el aplicativo`);
            }
        }else{
            res.status(404).send(`El usuario ${username} no se encuentra registrado en el aplicativo`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error interno');
    }
};

module.exports = {
    authAdmin,
};
