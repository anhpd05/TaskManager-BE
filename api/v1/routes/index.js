const taskRouter = require("./tasks.route")

module.exports = (app) => {
    const Version = "/api/v1"
    
    app.use(`${Version}/tasks` , taskRouter)

}