const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')
const validator = require('../validators/formsValidator')
const authController = require('../controllers/authController')
const { verifyCredentials, verifySuperAdmin} = require('../middleware/authMiddleware'); 


/**** LOGIN*/
router.get('/login/', userController.login )
// router.post('/login/', authController.authenticationLogin)
router.post('/login/',validator.validate('login'), userController.loginAction)

/**** LOGOUT*/
router.get('/logout', userController.logout); 

/**** ADMIN ROUTES*/
router.get('/admin', verifyCredentials, userController.admin); 
/**** GET ALL USERS*/
router.get('/admin/usuarios', verifyCredentials, userController.usersList)
/**** CREATE USER*/
router.get('/admin/usuarios/nuevo', verifySuperAdmin, userController.newUser)
router.post('/admin/usuarios/nuevo', verifySuperAdmin, validator.validate('createUser'), userController.newUserAction)

/**** UPDATE USER*/
router.get('/admin/:id/editar-usuario',verifySuperAdmin, userController.editUser)
router.post('/admin/:id/editar-usuario',verifySuperAdmin, validator.validate('editUser'),  userController.editUserAction)
/**** UPDATE STATE USER*/
router.put('/admin/:id/actualizar-estado-usuario', verifySuperAdmin, userController.toggleStateUser);
/**** DELETE USER*/
router.delete('/admin/:id/borrar-usuario', verifySuperAdmin, userController.deleteUser);


module.exports = router