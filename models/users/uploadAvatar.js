const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const uploadDir = path.join(process.cwd(), "public");

const uploadAvatar = async (req, res) => {
  try {
    const { path: tempName } = req.file;
    const id = nanoid();
    const fileName = path.join(uploadDir, "avatars", `${id}.jpg`);
    await fs.rename(tempName, fileName);
    res.status(200).json({
      status: "success",
      code: 200,
    });
  } catch (error) {
    await fs.unlink(tempName);
    throw error
  }
};

module.exports = uploadAvatar;
