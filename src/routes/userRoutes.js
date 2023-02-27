const userController = require('../controllers/userController.js')
const authController = require('../controllers/authController')

const router = require('express').Router()

router.post('/addUser', userController.addUser)

router.get('/allUser', userController.getAllUsers)

router.get('/admin', userController.getAdminUser)


router.get('/:id', userController.getOneUser)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)


router.post('/admin/', authController.authAdmin)


module.exports = router