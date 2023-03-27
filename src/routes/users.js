const express = require('express');
const router = express.Router()
//multer
const multer = require('multer');

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { verifyCredentials, verifySuperAdmin} = require('../middleware/authMiddleware'); 


/**** LOGIN*/
router.get('/login/', userController.login )
router.post('/login/', authController.authenticationLogin)

/**** LOGOUT*/
router.get('/logout', userController.logout); 

/**** ADMIN ROUTES*/
router.get('/admin', verifyCredentials, userController.admin); 
/**** GET ALL USERS*/
router.get('/admin/usuarios', verifyCredentials, userController.usersList)
/**** CREATE USER*/
router.get('/admin/usuarios/nuevo',verifySuperAdmin, userController.newUser)
router.post('/admin/usuarios/nuevo',verifySuperAdmin, userController.newUserAction)
/**** UPDATE USER*/
router.get('/admin/:id/editar-usuario',verifySuperAdmin, userController.editUser)
router.post('/admin/:id/editar-usuario',verifySuperAdmin, userController.editUserAction)
/**** UPDATE STATE USER*/
router.put('/admin/:id/actualizar-estado-usuario', verifySuperAdmin, userController.toggleStateUser);
/**** DELETE USER*/
router.delete('/admin/:id/borrar-usuario', verifySuperAdmin, userController.deleteUser);





/**** GET USER DETAIL*/
// router.get('/admin/usuario-detalle/:id', verifySuperAdmin, userController.userDetail)






// /**** GET USER BY ID */
// router.get('/:id/edit',authMiddleware,userController.getById)


// // Update user by id
// router.put('/user/:id',userController.updateUserById)

// Get all admin users
// router.get('/listAdmin', userController.getAdminUser)
// Delete user by id
// router.delete('/:id',userController.deleteUser)




module.exports = router