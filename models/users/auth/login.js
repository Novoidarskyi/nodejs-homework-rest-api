const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user");

const { SECRET_KEY } = process.env;

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

  const { verify } = user;
  if (!verify) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Please, verificated your email",
    });
    return;
  }

  const payload = { _id: user._id };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "success",
    code: 200,
    token,
    user: { email, subscription: user.subscription },
  });
};

module.exports = login;
