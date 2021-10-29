const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const jimp = require("jimp");
const User = require("../../models//users/user.js");

const uploadDir = path.join(process.cwd(), "public");

async function transformImage(pathFile) {
  const pic = await jimp.read(pathFile);
  await pic
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
}

const uploadAvatar = async (req, res) => {
  try {
    const { id, avatarURL } = req.user;
    const { path: tempName, originalname } = req.file;
    await transformImage(tempName);
    const fileName = path.join(
      uploadDir,
      "avatars",
      `${originalname.slice(0, originalname.length - 4)}_${nanoid()}.jpg`
    );
    await fs.rename(tempName, fileName);
    await User.updateOne({ _id: id }, { avatarURL: fileName });
    // updateAvatar(id, fileName);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { avatarURL: fileName },
    });
  } catch (error) {
    await fs.unlink(tempName);
    throw error;
  }
};

module.exports = uploadAvatar;
