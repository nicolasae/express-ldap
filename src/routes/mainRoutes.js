// ************ Require's ************/
const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const usersRoutes = require("./users")

/*** Home */
router.get("/", mainController.index);


/*** Users Router */
router.use("/users", usersRoutes);

module.exports = router;