const bcrypt = require("bcryptjs");
const User = require("../user");

const EmailService = require("../../../services/email");
const CreateSenderSendGrid = require("../../../services/emailSender");

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
  const { name, subscription, avatarURL, verifyToken } = await User.create(
    newUser
  );

  try {
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderSendGrid()
    );
    await emailService.sendVerifyEmail(verifyToken, email, name);
  } catch (error) {
    console.log(error);
  }

  const { subscription, avatarURL } = await User.create(newUser);
  res.status(201).json({
    status: "created",
    code: 201,
    user: { email, subscription, avatarURL },
  });
};

module.exports = signup;
