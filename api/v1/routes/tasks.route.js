const express = require("express");
const router = express.Router();

// const controller = require("../controller/task.controller");
const {
  detail,
  getAll,
  CreatePost,
  ChangeStatusPatch,
  ChangeMultiPatch,
  editPatch,
  deleteTaskDelete,
} = require("../controller/task.controller");

router.get("/", getAll);

router.get("/detail/:id", detail);

router.post("/", CreatePost);

router.patch("/change-status/:id", ChangeStatusPatch);

router.patch("/change-multi", ChangeMultiPatch);

router.patch("/:id", editPatch);

router.delete("/:id", deleteTaskDelete);

module.exports = router;
