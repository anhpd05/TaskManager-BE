const express = require("express");
const router = express.Router();

// const controller = require("../controller/task.controller");
const { detail, getAll, CreatePost } = require("../controller/task.controller");

router.get("/", getAll);

router.get("/detail/:id", detail);

router.post("/", CreatePost);

module.exports = router;
