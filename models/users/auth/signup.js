const bcrypt = require("bcryptjs");
const User = require("../user");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      status: "conflict",
      code: 409,
      message: "Email in use",
    });
    return;
  }
  const hasPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = { email, password: hasPassword };
  const { subscription } = await User.create(newUser);
  res.status(201).json({
    status: "created",
    code: 201,
    user: { email, subscription },
  });
};

module.exports = signup;
