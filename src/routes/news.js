const express = require('express');
const router = express.Router()
const multer = require('multer');

const upload = require('../middleware/multerNews');

const newController = require('../controllers/newController')
const validator = require('../validators/formsValidator')
const { verifyCredentials} = require('../middleware/authMiddleware'); 

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/img/uploads');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname.trim() );
//     }
// });

// const upload = multer({ storage: storage });

/**** GET ALL NEWS*/
router.get('/admin/noticias', verifyCredentials, newController.newsList)

/**** CREATE NEW*/
router.get('/admin/noticias/nuevo', verifyCredentials, newController.createNew)
router.post('/admin/noticias/nuevo', verifyCredentials, upload.single('imagen'), validator.validate('createNew'), newController.createNewAction)

/**** DETAIL NEW*/
router.get('/admin/:id/noticia', verifyCredentials, newController.detailNew)

/**** UPDATE USER*/
router.get('/admin/:id/editar-noticia', verifyCredentials, newController.editNew)
router.post('/admin/:id/editar-noticia', verifyCredentials,upload.single('imagen'), validator.validate('editNew') , newController.editNewAction)

// /**** UPDATE PORTAL STATE NEW*/
router.put('/admin/:id/actualizar-estado-portal-noticia', verifyCredentials,newController.toggleStatePortal);

// /**** UPDATE PORTAL STATE NEW*/
router.put('/admin/:id/actualizar-estado-noticia', verifyCredentials,newController.toggleState);

// /**** DELETE USER*/
router.delete('/admin/:id/borrar-noticia', verifyCredentials, newController.deleteNew);

module.exports = router