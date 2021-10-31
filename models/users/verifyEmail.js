const {
  findByVerifyToken,
  updateTokenVerify,
} = require("../users/operationsWithVerificationEmail");
const User = require("../users/user");
const EmailService = require("../../services/email");
const CreateSenderSendGrid = require("../../services/emailSender");

const verifyEmail = async (req, res, next) => {
  try {
    const user = findByVerifyToken(req.params.token);
    if (user) {
      await updateTokenVerify(user.id, true, null);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "Verification successful",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Not Found",
      code: 400,
      message: "User not found",
    });
  }
};

const repeatVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required field email",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      const { name, email, verify, verifyToken } = user;
      if (!verify) {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderSendGrid()
        );
        await emailService.sendVerifyEmail(verifyToken, email, name);
        res.status(200).json({
          status: "success",
          code: 200,
          message: "Resubmitted successful",
        });
      }
      res.status(409).json({
        status: "conflict",
        code: 409,
        message: "Email has been verified",
      });
    }
  } catch (error) {}
};

module.exports = {
  verifyEmail,
  repeatVerifyEmail,
};
