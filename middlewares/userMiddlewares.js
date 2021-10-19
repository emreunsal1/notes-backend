const { UsersModel } = require('../db');

const { createErrorMessage } = require('../utils/createMessage');

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

module.exports = {
  checkUserExistsMiddleware,
  getUserWithIdPasswordMiddleware,
};
