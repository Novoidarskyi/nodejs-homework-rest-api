const current = async (req, res) => {
  const { token, email, subscription } = req.user;

  if (token) {
    res.status(200).json({
      status: "authorized",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  }
};

module.exports = current;
