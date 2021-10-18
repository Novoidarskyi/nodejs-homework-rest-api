const express = require("express");
const router = express.Router();
const userOperation = require("../../models/users/auth/index");
const { validationUser } = require("../../models/users/validation");
const authenticate = require("../../middlewares/authenticate");

router.post("/signup", validationUser, userOperation.signup);

router.post("/login", validationUser, userOperation.login);

router.post("/logout", authenticate, userOperation.logout);

module.exports = router;
