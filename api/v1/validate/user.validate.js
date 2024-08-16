const User = require("../model/user.model");
const md5 = require("md5");
const validateEmail = (email) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regexEmail);
};
const validateUser = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const exsitEmail = await User.findOne({ email: email, deleted: false });
  if (!validateEmail(email)) {
    res.status(400).json({
      message: "Điền đúng định dạng email",
    });
  }
  console.log(email);
  if (exsitEmail) {
    res.status(400).json({
      message: "Đã tồn tại Email này .",
    });
  }
  next();
};
module.exports = { validateUser };
