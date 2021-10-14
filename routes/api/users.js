const express = require("express");
const router = express.Router();
const userOperation = require("../../models/users/index");
const { validationUser } = require("../../models/users/validation");

router.post("/register", validationUser, userOperation.register);

router.post("/login", validationUser, userOperation.login);

router.post("/logout", validationUser, userOperation.logout);

module.exports = router;
