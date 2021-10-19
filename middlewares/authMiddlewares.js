const { verifyJWT } = require('../utils/jwt');
const { createErrorMessage } = require('../utils/createMessage');
const { USER_INFO_COOKIE_NAME } = require('../constants');

const authRequiredMiddleware = (req, res, next) => {
  const authToken = JSON.parse(req.cookies[USER_INFO_COOKIE_NAME]);

  let user;
  try {
    user = verifyJWT(authToken);
  } catch (error) { console.log({ ...createErrorMessage('JWT NOT VERIFIED'), error }); }

  if (!authToken || !user) {
    return res.status(401).send(createErrorMessage('Not authorized'));
  }

  req.user = user;
  return next();
};

module.exports = {
  authRequiredMiddleware,
};
