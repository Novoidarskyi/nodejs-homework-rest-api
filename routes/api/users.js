const express = require("express");
const router = express.Router();
const userOperation = require("../../models/users/auth/index");
const { validationUser } = require("../../models/users/validation");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/uploadFiles");
const uploadAvatar = require("../../models/users/uploadAvatar");
const {
  verifyEmail,
  repeatVerifyEmail,
} = require("../../models/users/verifyEmail");

router.post("/signup", validationUser, userOperation.signup);

router.post("/login", validationUser, userOperation.login);

router.post("/logout", authenticate, userOperation.logout);

router.get("/current", authenticate, userOperation.current);

router.patch("/avatars", authenticate, upload.single("image"), uploadAvatar);

router.get("/verify/:verifyToken", verifyEmail);

router.post("/verify", repeatVerifyEmail);

module.exports = router;
