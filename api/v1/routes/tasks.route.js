const express = require("express");
const router = express.Router();

// const controller = require("../controller/task.controller");
const {
  detail,
  getAll,
  CreatePost,
  ChangeStatusPatch,
  ChangeMultiPatch,
} = require("../controller/task.controller");

router.get("/", getAll);

router.get("/detail/:id", detail);

router.post("/", CreatePost);

router.patch("/change-status/:id", ChangeStatusPatch);

router.patch("/change-multi", ChangeMultiPatch);
module.exports = router;
