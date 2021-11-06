const { UsersModel } = require('../db');
const { userWithoutPassword } = require('../utils/userUtils');

const getUsersController = (req, res) => {
  UsersModel.find({}, (err, users) => {
    const parsedUsers = users.map((user) => userWithoutPassword(user));
    res.send(parsedUsers);
  });
};

const getUserByIdController = (req, res) => {
  const { id } = req.params;

  UsersModel.findById(id, (err, user) => {
    if (err) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    return res.send(userWithoutPassword(user));
  });
};

module.exports = {
  getUsersController,
  getUserByIdController,
};
