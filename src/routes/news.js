const express = require('express');
const router = express.Router()
const multer = require('multer');

const newController = require('../controllers/newController')
const authController = require('../controllers/authController')
const { verifyCredentials} = require('../middleware/authMiddleware'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.trim() );
    }
});

const upload = multer({ storage: storage });


/**** GET ALL NEWS*/
// router.get('/admin/noticias', verifyCredentials, newController.usersList)
// router.get('/admin/noticias', newController.newsList)

/**** CREATE USER*/
// router.get('/admin/noticias/nuevo',verifyCredentials, newController.createNew)
router.get('/admin/noticias/nuevo', newController.createNew)
router.post('/admin/noticias/nuevo', upload.single('imagen'), newController.createNewAction)
/**** UPDATE USER*/
// router.get('/admin/:id/editar-noticia',verifyCredentials, newController.editUser)
// router.post('/admin/:id/editar-noticia',verifyCredentials, newController.editUserAction)
// /**** UPDATE STATE USER*/
// router.put('/admin/:id/actualizar-estado-noticia', verifyCredentials, newController.toggleStateUser);
// /**** DELETE USER*/
// router.delete('/admin/:id/borrar-noticia', verifyCredentials, newController.deleteUser);


module.exports = router