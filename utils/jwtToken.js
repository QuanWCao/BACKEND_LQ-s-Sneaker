// Create Token and saving in cookie
const User = require("../model/user");
const sendToken = async (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  const newUser = await User.findById(user._id).select("-password")

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    newUser,
    token,
  });
};

module.exports = sendToken;