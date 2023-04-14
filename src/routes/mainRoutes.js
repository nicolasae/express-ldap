// ************ Require's ************/
const express = require("express");
const router = express.Router();

const usersRoutes = require("./users")
const newsRoutes = require("./news")
const categoriesRoutes = require("./categories")
const apiRoutes = require("./api")

const userController = require('../controllers/userController')

/*** Home */
router.get("/", userController.login)

/*** Users Router */
router.use("", usersRoutes);
/*** News Router */
router.use("", newsRoutes);
/*** Categories Router */
router.use("", categoriesRoutes);
/*** API Router */
router.use("/api/", apiRoutes);


module.exports = router;