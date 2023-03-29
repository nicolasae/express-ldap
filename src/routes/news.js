const express = require('express');
const router = express.Router()


const newController = require('../controllers/newController')
const authController = require('../controllers/authController')
const { verifyCredentials} = require('../middleware/authMiddleware'); 


/**** GET ALL NEWS*/
// router.get('/admin/noticias', verifyCredentials, newController.usersList)
// router.get('/admin/noticias', newController.newsList)

/**** CREATE USER*/
// router.get('/admin/noticias/nuevo',verifyCredentials, newController.createNew)
router.get('/admin/noticias/nuevo', newController.createNew)
// router.post('/admin/noticias/nuevo', newController.createNewAction)
/**** UPDATE USER*/
// router.get('/admin/:id/editar-noticia',verifyCredentials, newController.editUser)
// router.post('/admin/:id/editar-noticia',verifyCredentials, newController.editUserAction)
// /**** UPDATE STATE USER*/
// router.put('/admin/:id/actualizar-estado-noticia', verifyCredentials, newController.toggleStateUser);
// /**** DELETE USER*/
// router.delete('/admin/:id/borrar-noticia', verifyCredentials, newController.deleteUser);


module.exports = router