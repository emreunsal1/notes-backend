const { USER_INFO_COOKIE_NAME } = require('../constants');
const { UsersModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');
const { createJWT } = require('../utils/jwt');

const registerController = (req, res) => {
  const { user } = req;

  UsersModel.create(user, (err, registeredUser) => {
    if (err) {
      return res.send(createErrorMessage('An error occured when register'));
    }
    return res.send(registeredUser);
  });
};

const loginController = (req, res) => {
  const { user } = req;

  delete user.password;

  const token = createJWT({
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  res.cookie(USER_INFO_COOKIE_NAME, `${JSON.stringify(token)}`);
  res.send({ token });
};

module.exports = {
  registerController,
  loginController,
};
