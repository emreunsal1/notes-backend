const { NotesModel, UsersModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');
const { userWithoutPassword } = require('../utils/userUtils');

const getMeController = (req, res) => {
  const { user } = req;

  UsersModel.findById(user._id, (err, userDoc) => {
    if (err) {
      return res.status(400).send({ ...createErrorMessage('Connot find user with id: ', user._id), err });
    }

    return res.send(userWithoutPassword(userDoc));
  });
};

const getMyNotesController = (req, res) => {
  const userId = req.user._id;

  NotesModel.find({ userId }, (err, docs) => {
    if (err) {
      res.status(400).send({ ...createErrorMessage('ConnotGetMyNotes with id: ', userId), err });
    }
    res.send(docs);
  });
};

module.exports = {
  getMeController,
  getMyNotesController,
};
