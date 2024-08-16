const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { validateUser } = require("../validate/user.validate");

router.post("/register", validateUser, userController.registerPost);

module.exports = router;
