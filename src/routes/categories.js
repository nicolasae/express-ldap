const express = require('express');
const router = express.Router()

const categoryController = require('../controllers/categoryController')
const { verifyCredentials} = require('../middleware/authMiddleware'); 


/**** GET ALL CATEGORIES*/
// router.get('/admin/categorias', verifyCredentials, categoryController.categoriesList)
router.get('/admin/categorias',  categoryController.categoriesList)

/**** CREATE CATEGORY*/
router.get('/admin/categorias/nuevo', categoryController.newCategory)
router.post('/admin/categorias/nuevo', categoryController.newCategoryAction)

/**** UPDATE USER*/
router.get('/admin/:id/editar-categoria', categoryController.editCategory)
router.post('/admin/:id/editar-categoria', categoryController.editCategoryAction)

/**** DETAIL CATEGORY*/
router.get('/admin/:id/categoria', categoryController.detailCategory)

module.exports = router