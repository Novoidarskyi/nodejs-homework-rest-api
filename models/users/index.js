const User = require("./user");

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({
      status: "conflict",
      code: 409,
      message: "Email in use",
    });
    return;
  }
  const { subscription } = await User.create(req.body);
  res.status(201).json({
    status: "created",
    code: 201,
    user: { email, subscription },
  });
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

module.exports = {
  signup,
  login,
  logout,
};
