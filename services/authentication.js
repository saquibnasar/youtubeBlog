const JWT = require("jsonwebtoken");

const secret = process.env.SECRECTKEY;

const generateToken = (user) => {
  const playload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = JWT.sign(playload, secret);
  return token;
};

const validateToken = (token) => {
  const playload = JWT.verify(token, secret);
  return playload;
};

module.exports = {
  generateToken,
  validateToken,
};
