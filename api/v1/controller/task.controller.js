const Task = require("../model/tasks.model")
// [GET] /tasks
module.exports.getAll = async (req ,res) => {
    const find = {
        deleted : false ,
    }
    const query = req.query

// Bộ lọc trạng thái 
    if(query.status){
        find.status = req.query.status
    }
    // console.log(query)
    const task = await Task.find(find)

    res.json(task)
}


// [GET] /tasks/detail/:id
module.exports.detail = async(req,res) => {
    try {
        const id = req.params.id;
        const task = await Task.find({
        deleted : false,
            _id : id
    })
    // console.log(task)  
        res.json(task)
    } catch (error) {
        res.send("Không tìm thấy!")
    }
   
}