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

    username = authenticate(options);

    username
        .then((response) => {
            console.log(response)
            return response            
        })
        .catch((err) => {
            return err;
        });
};

// Validate credentials User
const authAdmin = async (req, res) => {
    let username = req.body.user;
    let correo = `${username}@utp.edu.co`;
    let password = req.body.password;

    let infoUser = User.findOne({ where: { correo: correo } });

    let responseLdap = auth(username, password)
    responseLdap.then( (response) => {
        console.log(response)
        res.status(200).json({ data: response})

    })



    //   const validateLdap = async () => {
    //     const validateData = await auth(username, password);
    //     return validateData
    //   };

    //   users
    //     .then((response) => {
    //       if (response.admin) {
    //         res
    //           .status(200)
    //           .send(`El usuario ${username} si es administrador en el aplicativo`);
    //       } else {
    //         res
    //           .status(200)
    //           .send(`El usuario ${username} no es administrador en el aplicativo`);
    //       }
    //     })

    //     .catch((error) => {
    //       res.status(404).send(error);
    //     });
};

module.exports = {
    authAdmin,
};
