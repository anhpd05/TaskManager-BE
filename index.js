require("dotenv").config();

const express = require("express");
const database = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
const routeAPIver1 = require("./api/v1/routes/index");

//cors
app.use(cors());

// parse application/json
app.use(bodyParser.json());

// Kết nối cơ sở dữ liệu
database.connect();

//Routes Ver 1
routeAPIver1(app);

// const Task = require("./models/tasks.model")
// app.get("/tasks" , async(req,res) => {
//   // res.send("List tasks")
//   const task = await Task.find({
//     deleted : false
//   })
//   console.log(task)
//   res.json(task)
// })

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
