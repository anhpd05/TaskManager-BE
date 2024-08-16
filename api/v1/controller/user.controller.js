module.exports.registerPost = async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  res.send("register");
};
