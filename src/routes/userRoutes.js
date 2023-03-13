const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const { checkUser } = require('../middleware/auth.js')

const router = require('express').Router()

// Add user
router.post('addUser',userController.addUser)
// Get all users
router.get('allUser',userController.getAllUsers)
// Get all admin users
router.get('/listAdmin', userController.getAdminUser)
// Get user by id
router.get('/:id',userController.getOneUser)
// Update user by id
router.put('/:id',userController.updateUser)
// Delete user by id
router.delete('/:id',userController.deleteUser)


router.post('/login/', authController.authAdmin)


module.exports = router