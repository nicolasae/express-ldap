const jwt = require('jsonwebtoken');
const db = require("../models");

// create main Model
const User = db.users;

// Main Work

// 1.Create User
const addUser = async (req, res) => {
  let info = {
    nombre: req.body.nombre,
    correo: req.body.correo,
    admin: req.body.admin ? req.body.admin : false,
  };

  const user = await User.create(info);
  res.status(200).send(user);
  console.log(user);
};

// 2.Get All Users
const getAllUsers = async (req, res) => {
  let users = await User.findAll({
  });
  res.status(200).send(users);
};

// 3.Get Single User
const getOneUser = async (req, res) => {
  let id = req.params.id;
  let users = await User.findOne({ where: { id: id } });
  res.status(200).send(users);
};

// 4.Get update User
const updateUser = async (req, res) => {
  let id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
};

// 5.Delete user by Id
const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.status(200).send("User is deleted!");
};

// 6.Get admin users
const getAdminUser = async (req, res) => {
  const users = await User.findAll({ where: { admin: true } });
  res.status(200).send(users);

};



module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getAdminUser,

};
