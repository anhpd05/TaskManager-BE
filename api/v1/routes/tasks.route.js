const express = require('express');
const router = express.Router();

const Task = require("../../../models/tasks.model")
router.get("/" , async(req,res) => {
  // res.send("List tasks")
  const task = await Task.find({
    deleted : false
  })
  console.log(task)  
  res.json(task)
})

router.get("/detail/:id" , async(req , res) => {
  const id = req.params.id
  const taskDetail = await Task.find({
    _id : id
  })
  res.json(taskDetail)
})
module.exports = router