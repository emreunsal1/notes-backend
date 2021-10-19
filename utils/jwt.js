const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

const createJWT = (data) => jwt.sign(data, JWT_SECRET_KEY);

const verifyJWT = (token) => jwt.verify(token, JWT_SECRET_KEY);

module.exports = {
  createJWT,
  verifyJWT,
};
