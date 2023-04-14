const express = require('express');
const router = express.Router()

const apiController = require('../controllers/apiController')

/**** GET ALL NEWS*/
router.get('/all-news', apiController.getAllNews)
/**** GET NEW BY ID*/
router.get('/information-new/:id', apiController.getInfoNewById)

/**** GET ALL CATEGORIES*/
router.get('/all-categories', apiController.getAllCategories)

module.exports = router