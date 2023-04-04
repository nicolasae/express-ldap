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
// router.get('/admin/noticias', verifyCredentials, newController.newsList)
router.get('/admin/noticias', newController.newsList)

/**** CREATE USER*/
router.get('/admin/noticias/nuevo', newController.createNew)
router.post('/admin/noticias/nuevo', upload.single('imagen'), newController.createNewAction)

/**** DETAIL NEW*/
router.get('/admin/:id/noticia', newController.detailNew)

/**** UPDATE USER*/
router.get('/admin/:id/editar-noticia', newController.editNew)
router.post('/admin/:id/editar-noticia',upload.single('imagen'), newController.editNewAction)


// /**** UPDATE PORTAL STATE NEW*/

router.put('/admin/:id/actualizar-estado-portal-noticia',newController.toggleStatePortal);
// /**** UPDATE PORTAL STATE NEW*/

router.put('/admin/:id/actualizar-estado-noticia',newController.toggleState);
// /**** DELETE USER*/

router.delete('/admin/:id/borrar-noticia', newController.deleteNew);


module.exports = router