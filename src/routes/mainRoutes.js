// ************ Require's ************/
const express = require("express");
const router = express.Router();
const path = require('path');

const mainController = require("../controllers/mainController");
const usersRoutes = require("./users")
const newsRoutes = require("./news")

/*** Home */
router.get("/", mainController.index);


/*** Users Router */
router.use("", usersRoutes);
/*** News Router */
router.use("", newsRoutes);

module.exports = router;