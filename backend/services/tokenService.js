const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../Config/config');

const signToken = (id, role) => {
  return jwt.sign(
    { id, role },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
};

const verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, config.JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.role);
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + config.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

module.exports = { signToken, verifyToken, createSendToken };