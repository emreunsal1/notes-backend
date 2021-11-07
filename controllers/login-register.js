const { USER_INFO_COOKIE_NAME } = require('../constants');
const { UsersModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');
const { createJWT } = require('../utils/jwt');

const registerController = (req, res) => {
  const { user } = req;

  UsersModel.create(user, (error, registeredUser) => {
    if (error) {
      return res.status(400).send({ ...createErrorMessage('An error occured when register') });
    }
    return res.send(registeredUser);
  });
};

const loginController = (req, res) => {
  const { user } = req;

  delete user.password;

  const token = createJWT({
    _id: user._id,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  const maxAge = 36000000;
  res.cookie(USER_INFO_COOKIE_NAME, `${JSON.stringify(token)}`, {
    httpOnly: false,
    sameSite: 'none',
    expires: new Date(Date.now() + maxAge),
  });
  res.send({ token });
};

const logOutController = (req, res) => {
  res.cookie(USER_INFO_COOKIE_NAME, '', {
    expires: new Date(new Date(Date.now() - 100)),
    httpOnly: false,
    sameSite: 'none',
  });
  res.send({ success: true });
};

module.exports = {
  registerController,
  loginController,
  logOutController,
};
