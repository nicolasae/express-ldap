const models = require('../database/models');

// LOGIN
const login = async (req,res) => {
  return res.render('login')
};

const logout = async (req, res) => {
  req.session.destroy();
  res.redirect('login');
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
    })
    res.render('admin/usersList', { users: data})
    // res.status(200).send(users);
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
      // res.status(200).send(data) : 
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
    active: (active) ? active : 1,
    idRole: (idRole === 'on') ? 1 : 2,
  };

  try {
    const user = await models.User.create(infoUser);
    console.log('Usuario creado exitosamente',infoUser)
    return res.redirect('/admin')
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
    await User.destroy({ where: { id: id } });
    res.status(200).send("User deleted!");
  }
  catch(error){
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor`})
  }
};

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

};
