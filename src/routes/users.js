const express = require('express');
const router = express.Router()
//multer
const multer = require('multer');

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware'); 

/**** LOGIN*/
router.get('/login/', userController.login )
router.post('/login/', authController.authenticationLogin)

/**** LOGOUT*/
router.get('/logout', userController.logout); 

/**** ADMIN ROUTES*/
router.get('/admin', authMiddleware, userController.admin); 
/**** GET ALL USERS*/
router.get('/admin/usuarios', authMiddleware, userController.usersList)
/**** CREATE USER*/
router.get('/admin/usuarios/nuevo',authMiddleware, userController.newUser)
router.post('/admin/usuarios/nuevo',authMiddleware, userController.newUserAction)

/**** GET USER DETAIL*/
// router.get('/admin/usuario-detalle/:id', authMiddleware, userController.userDetail)






// /**** GET USER BY ID */
// router.get('/:id/edit',authMiddleware,userController.getById)


// // Update user by id
// router.put('/user/:id',userController.updateUserById)

// Get all admin users
// router.get('/listAdmin', userController.getAdminUser)
// Delete user by id
// router.delete('/:id',userController.deleteUser)




module.exports = router