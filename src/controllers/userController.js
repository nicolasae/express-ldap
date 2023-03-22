const models = require('../database/models');

// LOGIN
const login = async (req,res) => {
  return res.render('login')
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
    let data = await models.User.findAll();
    data.forEach( user => {      
      user.role  = ( user.idRole === 1 ) ? 'Super Administrador' : 'Administrador' 
      user.state  = ( user.active === true ) ? 'Activo' : 'Inactivo' 
    })
    res.render('admin/usersList', { listUsers: data, infoUserLogged: req.session.infoUserLogged })
  }
  catch(error){
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor al listar los usuarios`})
  }
};

const userDetail = async( req,res ) => {
  const { id } = req.params

  try {
    let data = await models.User.findByPk(id);
    ( data ) ? 
      res.render('admin/userDetails', { users: data}):
      res.status(500).json({ "message":`No hay un usuario relacionado al id ${id}`});
  }
  catch(error){
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor`})
  }
}

// CREATE USER VIEW 
const newUser = async(req, res) => {
  return res.render('admin/newUser',{ active: 'create'});
}

// CREATE USER PROCCESS
const newUserAction = async (req, res) => {

  const { name, email, active, idRole } = req.body
    
  let infoUser = {
    name,
    email,
    active: (active === 'on' ) ? true : false,
    idRole: (idRole === 'on' ) ? 1 : 2,
  };

  try {
    // const user = await models.User.create(infoUser);
    const user = await models.User.findOrCreate({
      where: { email: email },
      defaults: infoUser
    });

    return res.redirect('/admin/usuarios')
  }
  catch(error){
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor al crear nuevo usuario`})
  }
  
};

// UPDATE USER
const editUser = async (req, res) => {
  let id = req.params.id;
  
  try {
    const user = await models.User.findByPk(id);
    const { dataValues } = user
    return res.render('admin/newUser', dataValues );

  }catch(error){  
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor`})
  }
};

const editUserAction = async( req, res ) => {

  try {
    let id = req.params.id 
    const { name, email, active, idRole } = req.body;
    let infoUser = {
      name,
      email,
      active: (active === 'on') ? true : false,
      idRole: (idRole === 'on') ? 1 : 2,
    };
  
    const user = await models.User.update(infoUser, { where: { id: id } });
    return res.redirect('/admin')
  }catch(error) {
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor al actualizar el usuario`})
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
    console.log(error)
    res.status(500).json({ "message":`Problema con la eliminación del usuario`})
  }
};

const toggleStateUser = async( req, res ) => {
  const { id } = req.params;
  try {
    let user = await models.User.findByPk(id);
    let state = user.dataValues.active
    const updateUser = await models.User.update({active: !state }, { where: { id: id } });
    return res.redirect('/admin/usuarios')

  }catch(error){
    console.log(error)
    res.status(500).json({ "message":`Problema con cambio del estado del usuario`})
  }
}

module.exports = {
  login,
  logout,
  admin,
  usersList,
  userDetail,
  newUser,
  newUserAction,
  editUser,
  editUserAction,
  toggleStateUser,
  deleteUser,

};
