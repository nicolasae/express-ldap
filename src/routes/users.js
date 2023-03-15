const express = require('express');
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

// const { checkUser } = require('../middleware/auth.js')


/**** GET ALL USERS*/
router.get('/list', userController.list)


// Add user
// router.post('/user/add',userController.addUser)
// // Get user by id
// router.get('/user/:id',userController.getUserById)
// // Update user by id
// router.put('/user/:id',userController.updateUserById)

// Get all admin users
// router.get('/listAdmin', userController.getAdminUser)
// Delete user by id
// router.delete('/:id',userController.deleteUser)

/**** GET LOGIN */
router.get('/login/', userController.login )

/**** PROCESS LOGIN */
router.post('/login/', authController.authenticationLogin)


module.exports = router