const User = require("../user");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({
      status: "unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
    return;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "People is authorized",
  });
};

module.exports = login;
