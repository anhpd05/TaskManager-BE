const taskRouter = require("./tasks.route");
const userRouter = require("./user.route");

module.exports = (app) => {
  const Version = "/api/v1";

  app.use(`${Version}/tasks`, taskRouter);

  app.use(`${Version}/user`, userRouter);
};
