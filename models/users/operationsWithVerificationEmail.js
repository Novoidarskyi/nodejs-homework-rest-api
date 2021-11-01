const User = require("./user");

const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const updateTokenVerify = async (_id, verify, verifyToken) => {
  return await User.updateOne({ _id, verify, verifyToken });
};

module.exports = {
  findByVerifyToken,
  updateTokenVerify,
};
