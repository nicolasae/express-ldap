const models = require('../database/models');
const {validationResult } = require('express-validator')

// LOGIN
const login = async (req,res) => {
  return res.render('login',{title:'Express App'})
};

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
  }
  catch(error){
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
      const { name, email, active, idRole } = req.body
      let infoUser = {
        name,
        email,
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
        res.render('admin/newUser',{ infoUser:'',infoUserLogged: req.session.infoUserLogged, active: 'create', mensaje:'Correo no disponible para creación de usuario', ok:false })
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
    const { name, email, active, idRole } = req.body;
    let flag = false 
    let dataUser = {}
    const errors = validationResult(req);

    if (active == undefined || idRole === undefined)  {
      dataUser = await models.User.findByPk(id)
      flag = true
    }

    let infoUser = {
      id: parseInt(id),
      name,
      email,
      active: (flag) ? dataUser.active: (active === 'on') ? true : false,
      idRole: (flag) ? dataUser.idRole: (idRole === 'on') ? 1 : 2,
    };
    

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
  logout,
  admin,
  usersList,
  newUser,
  newUserAction,
  editUser,
  editUserAction,
  toggleStateUser,
  deleteUser,
};
