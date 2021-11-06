const { UsersModel } = require('../db');

const { createErrorMessage } = require('../utils/createMessage');
const { validateUser } = require('../utils/validation/user');

const checkUserExistsMiddleware = (req, res, next) => {
  const { username, password } = req.body;
  const user = {
    username,
    password,
  };
  UsersModel.findOne({ username }, (err, exists) => {
    if (exists) {
      return res.status(400).send(createErrorMessage('User exists'));
    }
    req.user = user;
    return next();
  });
};

const getUserWithIdPasswordMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  UsersModel.findOne({ username, password }, (err, findedUser) => {
    if (!findedUser) {
      return res.status(404).send(createErrorMessage('UserNotFound'));
    }
    req.user = findedUser;
    return next();
  });
};

const validateUserMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  const validatedUser = validateUser({ username, password });
  if (validatedUser.error) {
    return res.send(createErrorMessage(validatedUser.error.message));
  }
  return next();
};

module.exports = {
  checkUserExistsMiddleware,
  getUserWithIdPasswordMiddleware,
  validateUserMiddleware,
};
