const { NotesModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');
const { validateFavorite } = require('../utils/validation/note');

const addNoteController = (req, res) => {
  const { title, content } = req.body;
  const { user } = req;

  const newNote = {
    title,
    content,
    userId: user._id,
  };
  NotesModel.create(newNote, (err, newDoc) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: 'An error occured when inserting',
      });
    }
    return res.send({
      success: true,
      note: newDoc,
    });
  });
};

const updateNoteWithIdController = (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const filterWith = {
    _id: id,
    userId: user._id,
  };

  const updateOptions = {
    new: true,
  };

  NotesModel.findOneAndUpdate(filterWith, req.body, updateOptions, (err, updatedDoc) => {
    if (err) {
      return res.status(400).send({
        ...createErrorMessage(`NoteNotUpdatedWithId: ${id}`),
        err,
      });
    }

    if (!updatedDoc) {
      return res.status(401).send({
        ...createErrorMessage(`ConnotUpdate with id: ${id}`),
        type: 'Unauthorized',
      });
    }

    return res.send({
      success: true,
      data: updatedDoc,
    });
  });
};

function deleteNoteWithIdController(req, res) {
  const { id } = req.params;
  const { user } = req;

  if (!id) {
    return res.send(createErrorMessage('You must send id!'));
  }

  NotesModel.findByIdAndDelete({ _id: id, userId: user._id }, (err, deletedDoc) => {
    if (err) {
      return res.status(401).send({
        ...createErrorMessage(`ConnotDeleteNoteWithId: ${id}`),
        error: 'CONNOT_FIND',
      });
    }

    return res.send({
      success: true,
      data: deletedDoc,
    });
  });
}

const getNotesController = (req, res) => {
  const query = {};

  const { userId } = req.query;
  if (userId) {
    query.userId = userId;
  }
  NotesModel.find(query, (err, docs) => {
    if (err) {
      res.send({ ...createErrorMessage('ConnotGetNotes'), err });
    }

    return res.send(docs);
  });
};

const getNoteWithIdController = (req, res) => {
  const { id } = req.params;

  NotesModel.findById(id, (err, docs) => {
    if (err) {
      res.status(400).send({ ...createErrorMessage('ConnotGetNotes'), err });
    }
    res.send(docs);
  });
};

const getNoteWithUserIdController = (req, res) => {
  const { userId } = req.query;

  NotesModel.find({ userId }, (err, docs) => {
    if (err) {
      res.status(400).send({ ...createErrorMessage('ConnotGetNotes with id: ', userId), err });
    }
    res.send(docs);
  });
};

const updateNoteFavoriteController = (req, res) => {
  const { favorited } = req.body;
  const { id } = req.params;
  const { user } = req;
  const userId = user._id;
  const validatedData = validateFavorite({ favorited });

  if (validatedData.error) {
    return res.status(400).send(createErrorMessage(validatedData.error.message));
  }

  const favoritedValue = validatedData.value.favorited;
  const updateQuery = { favorited: favoritedValue };
  const findQuery = { _id: id, userId };

  NotesModel.findOneAndUpdate(findQuery, updateQuery, { new: true }, (err, docs) => {
    if (err) {
      return res.status(401).send({ ...createErrorMessage('ConnotFavoriteThisNote with id: ', userId), err });
    }
    res.send({ success: true, note: docs });
  });
};

module.exports = {
  addNoteController,
  getNotesController,
  updateNoteWithIdController,
  deleteNoteWithIdController,
  getNoteWithIdController,
  getNoteWithUserIdController,
  updateNoteFavoriteController,
};
