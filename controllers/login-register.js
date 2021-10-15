const { UsersModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');

const registerController = (req, res) => {
  const { user } = req;

  UsersModel.create(user, (err, registeredUser) => {
    if (err) {
      return res.send(createErrorMessage('An error occured when register'));
    }
    return res.send(registeredUser);
  });
};

module.exports = {
  registerController,
};
