const express = require('express');
const router = express.Router()

const categoryController = require('../controllers/categoryController')
const { verifyCredentials} = require('../middleware/authMiddleware'); 


/**** GET ALL CATEGORIES*/
router.get('/admin/categorias', verifyCredentials, categoryController.categoriesList)

/**** CREATE CATEGORY*/
router.get('/admin/categorias/nuevo',verifyCredentials, categoryController.newCategory)
router.post('/admin/categorias/nuevo',verifyCredentials, categoryController.newCategoryAction)

/**** UPDATE USER*/
router.get('/admin/:id/editar-categoria', verifyCredentials,categoryController.editCategory)
router.post('/admin/:id/editar-categoria', verifyCredentials,categoryController.editCategoryAction)

/**** DETAIL CATEGORY*/
router.get('/admin/:id/categoria',verifyCredentials, categoryController.detailCategory)

module.exports = router