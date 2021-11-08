const { verifyJWT } = require('../utils/jwt');
const { createErrorMessage } = require('../utils/createMessage');
const { USER_INFO_COOKIE_NAME } = require('../constants');

const authRequiredMiddleware = (req, res, next) => {
  const token = req.headers[USER_INFO_COOKIE_NAME];

  if (!token || !token.length) {
    return res.status(401).send(createErrorMessage('COOKIE_NOT_SENDED'));
  }

  try {
    const user = verifyJWT(token);
    if (!user) {
      return res.status(401).send(createErrorMessage('Not authorized'));
    }
    req.user = user;
    return next();
  } catch (error) { return res.status(401).send({ ...createErrorMessage('JWT NOT VERIFIED'), error }); }
};

module.exports = {
  authRequiredMiddleware,
};
