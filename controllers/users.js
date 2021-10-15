const { UsersModel } = require('../db');

const addUserController = (req, res) => {
  const { name, username, password } = req.body;

  const newUser = {
    name,
    username,
    password,
  };

  UsersModel.create(newUser, (err, newDoc) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: 'An error occured when save user',
      });
    }
    return res.send({
      success: true,
      note: newDoc,
    });
  });
};

const getUsersController = (req, res) => {
  UsersModel.find({}, (err, users) => {
    res.send(users);
  });
};

const getUserByIdController = (req, res) => {
  const { id } = req.params;

  UsersModel.findOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    return res.send(user);
  });
};

module.exports = {
  addUserController,
  getUsersController,
  getUserByIdController,
};
