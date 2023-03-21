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
  console.log('entro a admin',req.session.infoUserLogged)
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
    res.status(500).json({ "message":`Problema con el servidor`})
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
    return res.render('admin')
  }
  catch(error){
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor`})
  }
  
};

// EDIT USER
const editUser = async (req, res) => {
  let id = req.params.id;
  const user = await models.User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
};


// // Delete user by Id
// const deleteUser = async (req, res) => {
//   let id = req.params.id;

//   try {
//     await User.destroy({ where: { id: id } });
//     res.status(200).send("User deleted!");
//   }
//   catch(error){
//     console.log(error)
//     res.status(500).json({ "message":`Problema con el servidor`})
//   }
// };





// // Get admin users
// const getAdminUser = async (req, res) => {
//   const users = await User.findAll({ where: { admin: 2 } });
//   res.status(200).send(users);

// };



module.exports = {
  login,
  logout,
  admin,
  usersList,
  userDetail,
  newUser,
  newUserAction,

};
