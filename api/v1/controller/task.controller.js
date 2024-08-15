const Task = require("../model/tasks.model")
// [GET] /tasks
module.exports.getAll = async (req ,res) => {
    const find = {
        deleted : false ,
    }
    const sort = {}
    const query = req.query

// Bộ lọc trạng thái 
    if(query.status){
        find.status = req.query.status
    }
// End Bộ lọc trạng thái   

// Sort
    if(query.sortKey && query.sortValue){
        sort[query.sortValue] = query.sortValue
    }
//End sort
    console.log(query)
    const task = await Task.find(find).sort(sort)

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