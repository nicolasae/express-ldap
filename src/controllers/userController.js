const models = require('../database/models');
const {validationResult } = require('express-validator')
const bcrypt = require('bcrypt');

const authController = require('../controllers/authController')

// LOGIN
const login = async (req,res) => {
  return res.render('login',{title:'Express App'})
};

const checkTypeOfVerification = async( req, res ) => {
  const userArray = ['liNgfreN','iNtoPTiv']
  const {username} = req.body

  if(userArray.includes(username)){
    loginAction(req,res)
  }else {
    authController.authenticationLogin(req,res)
  }
}

const loginAction = async( req, res ) => {
  console.log('entro')
  try {
    const errors = validationResult(req);
    const {username , password} = req.body
    const localEmail = `${username}@utp.edu.co`;
    
    if (!errors.isEmpty()) {
      res.render('login',{ infoUser:'', active: 'login', mensaje: errors.errors, ok:false })
    }
    else {
      const infoUser = await models.User.findOne({ where: { email: localEmail } });
      
      const passwordMatches = bcrypt.compareSync(password, infoUser.password);
      
      if(infoUser.active){
        if(passwordMatches){

          let response = {
            'role': infoUser.idRole == 1 ? 'Super Administrador' : 'Administrador',
            ...infoUser.dataValues
          }
          req.session.infoUserLogged = response
          res.redirect('/admin');

        } else {
          res.render('login', { infoUser:'',  mensaje:'Las credenciales son inválidas', ok:false })
        }
      }
      else {
        res.render('login', { infoUser:'',  mensaje:'Usuario inactivo. Comuniquese con el administrador del sitio', ok:false })
      }
    }
  } catch (error) {
    console.log('Ha ocurrido un error: ' + error);
  }

}

const logout = async (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}

// ADMIN INDEX
const admin = async (req, res) => {
  res.render('admin', { infoUserLogged: req.session.infoUserLogged })
};

//GET ALL USERS
const usersList = async (req, res) => {
  try {
    let dataActives = await models.User.findAll({
      where: { active: 1 },
    });

    let dataInactives = await models.User.findAll({
      where: { active: 0 },
    });

    dataActives.forEach( user => {      
      user.role  = ( user.idRole === 1 ) ? 'Super Administrador' : 'Administrador' 
      user.state  = ( user.active === true ) ? 'Activo' : 'Inactivo' 
    })
    
    dataInactives.forEach( user => {      
      user.role  = ( user.idRole === 1 ) ? 'Super Administrador' : 'Administrador' 
      user.state  = ( user.active === true ) ? 'Activo' : 'Inactivo' 
    })
    res.render('admin/usersList', { listUsersActives: dataActives,listUsersInactives: dataInactives, infoUserLogged: req.session.infoUserLogged })
  
  }catch(error){
    console.log('Ha ocurrido un error: ' + error);
  }
};

// CREATE USER VIEW 
const newUser = async(req, res) => {
  return res.render('admin/newUser',{ infoUser:'', infoUserLogged: req.session.infoUserLogged, active: 'create'});
}

// CREATE USER PROCCESS
const newUserAction = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('admin/newUser',{ infoUser:'',infoUserLogged: req.session.infoUserLogged, active: 'create', mensaje: errors.errors, ok:false })
    }
    else {
      const { name, identification, password, email, active, idRole } = req.body
      
      let hashedPassword = password
      
      if(password != '') {
        const saltRounds = 10; 
        hashedPassword = await bcrypt.hash(password, saltRounds);d
      }

      let infoUser = {
        name,
        identification,
        email,
        password:hashedPassword,
        active: (active === 'on' ) ? true : false,
        idRole: (idRole === 'on' ) ? 1 : 2,
      };

      const [user, created] = await models.User.findOrCreate({
        where: { email: email },
        defaults: infoUser
      });
      
      if(created){
        res.render('admin/newUser',{ infoUser:'', infoUserLogged: req.session.infoUserLogged, active: 'create', mensaje: 'Usuario creado con éxito', ok:true })
      }else {
        res.render('admin/newUser',{ infoUser:'',infoUserLogged: req.session.infoUserLogged, active: 'create', mensaje:'Ese correo ya está en uso. Pruebe con otro', ok:false })
      }
    }
  }
  catch(error){
    console.log('Ha ocurrido un error: ' + error);
  }
};

// UPDATE USER
const editUser = async (req, res) => {
  
  let id = req.params.id;
  let infoUserLogged = req.session.infoUserLogged

  try {
    const user = await models.User.findByPk(id);
    const { dataValues } = user
    return res.render('admin/newUser', { infoUser: dataValues, infoUserLogged:infoUserLogged, });

  } catch(error){  
    console.log('Ha ocurrido un error: ' + error);
    res.status(500).json({ "message":`Problema con el servidor`})
  }
};

const editUserAction = async( req, res ) => {
  
  try {
    
    let id = req.params.id 
    let infoUserLogged = req.session.infoUserLogged
    const { name,identification,email,active,idRole } = req.body;
    let flag = false 
    // let dataUser = {}
    const errors = validationResult(req);

    const dataUser = await models.User.findByPk(id)

    // if (active == undefined || idRole === undefined)  {
    //   dataUser = await models.User.findByPk(id)
    //   flag = true
    // }

    let infoUser = {
      id: parseInt(id),
      name,
      identification,
      email,
      password:dataUser.password,
      active: (active === 'on') ? true : false ,
      idRole: (idRole === 'on') ? 1 : 2 ,
    };

    // console.log(dataUser)
    // console.log(infoUser)

    if (!errors.isEmpty()) {
      res.render('admin/newUser', {infoUser: infoUser, infoUserLogged:infoUserLogged, mensaje:errors.errors, ok:false} )
    }
    else {
      const user = await models.User.update(infoUser, { where: { id: id } })      
      res.render('admin/newUser', {infoUser: infoUser, infoUserLogged:infoUserLogged, mensaje:'Usuario actualizado correctamente',ok:true} )
    }
    
  }catch(error) {
    console.log('Ha ocurrido un error: ' + error);
  }
}

// Delete user by Id
const deleteUser = async (req, res) => {
  let id = req.params.id;

  try {
    let user = await models.User.destroy({ where: { id: id } });
    return res.redirect('/admin/usuarios')
  }
  catch(error){
    console.log('Ha ocurrido un error: ' + error);
  }
};

const toggleStateUser = async( req, res ) => {
  const { id } = req.params;
  
  try {
      let user = await models.User.findByPk(id);
      let state = user.dataValues.active
      const updateUser = await models.User.update({active: !state }, { where: { id: id } });
      
      res.redirect('/admin/usuarios')

  }catch(error){
    console.log('Ha ocurrido un error: ' + error);
  }
}

module.exports = {
  login,
  loginAction,
  logout,
  admin,
  usersList,
  newUser,
  newUserAction,
  editUser,
  editUserAction,
  toggleStateUser,
  deleteUser,
  checkTypeOfVerification
}
