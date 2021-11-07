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

const getMyNotesController = async (req, res) => {
  const userId = req.user._id;

  const query = NotesModel.find({ userId });
  try {
    const data = await query.sort({ updatedAt: 'desc' }).exec();
    return res.send(data);
  } catch (err) {
    return res.status(400).send({ ...createErrorMessage('ConnotGetMyNotes with id: ', userId), err });
  }
};

module.exports = {
  getMeController,
  getMyNotesController,
};
