const { UsersModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');
const { createJWT } = require('../utils/jwt');
const { userWithoutPassword } = require('../utils/userUtils');

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

  const token = createJWT(userWithoutPassword(user));

  res.send({ token });
};

module.exports = {
  registerController,
  loginController,
};
