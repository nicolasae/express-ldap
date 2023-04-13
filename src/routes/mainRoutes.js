// ************ Require's ************/
const express = require("express");
const router = express.Router();
const path = require('path');

const mainController = require("../controllers/mainController");
const userController = require('../controllers/userController')
const usersRoutes = require("./users")
const newsRoutes = require("./news")
const categoriesRoutes = require("./categories")

/*** Home */
// router.get("/", mainController.index);
router.get("/", userController.login)



/*** Users Router */
router.use("", usersRoutes);
/*** News Router */
router.use("", newsRoutes);
/*** Categories Router */
router.use("", categoriesRoutes);

module.exports = router;