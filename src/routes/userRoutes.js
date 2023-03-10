const userController = require('../controllers/userController.js')
const authController = require('../controllers/authController')

const { checkUser } = require('../middleware/auth.js')

const router = require('express').Router()

// Add user
router.post('addUser', checkUser, userController.addUser)
// Get all users
router.get('allUser', checkUser, userController.getAllUsers)
// Get all admin users
router.get('/listAdmin', checkUser,  userController.getAdminUser)
// Get user by id
router.get('/:id', checkUser, userController.getOneUser)
// Update user by id
router.put('/:id', checkUser, userController.updateUser)
// Delete user by id
router.delete('/:id', checkUser, userController.deleteUser)


router.post('/login/', authController.authAdmin)


module.exports = router