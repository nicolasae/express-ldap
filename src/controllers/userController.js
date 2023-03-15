const models = require('../database/models');

// LOGIN
const login = async (req,res) => {
  return res.render('users/login')
}

//GET ALL USERS
const list = async (req, res) => {

  try {
    let users = await models.User.findAll();
    res.status(200).send(users);
  }
  catch(error){
    console.log(error)
    res.status(500).json({ "message":`Problema con el servidor`})
  }
};


// // Get Single User
// const getUserById = async (req, res) => {
  
//   const id = req.params.id;
  
//   try {
//     let users = await models.User.findByPk(id);
//     ( users ) ? 
//       res.status(200).send(users) : 
//       res.status(500).json({ "message":`No hay un usuario relacionado al id ${id}`});
//   }
//   catch(error){
//     console.log(error)
//     res.status(500).json({ "message":`Problema con el servidor`})
//   }

// };

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



// // Create User
// const addUser = async (req, res) => {
//   let info = {
//     name: req.body.name,
//     email: req.body.email,
//     active: req.body.active,
//     idRole: req.body.idRole ? req.body.idRole : 2,
//   };

//   const user = await models.User.create(info);
//   res.status(200).send(user);
//   console.log(user);
// };




// // Get update User
// const updateUserById = async (req, res) => {
//   let id = req.params.id;
//   const user = await models.User.update(req.body, { where: { id: id } });
//   res.status(200).send(user);
// };



// // 6.Get admin users
// const getAdminUser = async (req, res) => {
//   const users = await User.findAll({ where: { admin: 2 } });
//   res.status(200).send(users);

// };



module.exports = {
  list,
  login,
  // getUserById,
  // deleteUser,
  
  // addUser,
  // getAllUsers,
  // updateUserById,
  // getAdminUser,

};
