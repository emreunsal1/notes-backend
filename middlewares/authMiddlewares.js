const { verifyJWT } = require('../utils/jwt');
const { createErrorMessage } = require('../utils/createMessage');
const { USER_INFO_COOKIE_NAME } = require('../constants');

const authRequiredMiddleware = (req, res, next) => {
  const cookie = req.cookies[USER_INFO_COOKIE_NAME];

  if (!cookie || !cookie.length) {
    return res.status(400).send(createErrorMessage('COOKIE_NOT_SENDED'));
  }

  try {
    const authToken = JSON.parse(req.cookies[USER_INFO_COOKIE_NAME]);
    const user = verifyJWT(authToken);
    if (!user) {
      return res.status(401).send(createErrorMessage('Not authorized'));
    }
    req.user = user;
    return next();
  } catch (error) { return console.log({ ...createErrorMessage('JWT NOT VERIFIED'), error }); }
};

module.exports = {
  authRequiredMiddleware,
};
