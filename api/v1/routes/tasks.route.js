const express = require('express');
const router = express.Router();

const controller = require("../controller/task.controller");
router.get("/" , controller.getAll)

router.get("/detail/:id", controller.detail);


module.exports = router