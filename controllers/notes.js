const { NotesModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');

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
  const { title, content } = req.body;
  const { user } = req;

  if (!title && !content) {
    res.send(createErrorMessage('You must send content or title field with request!'));
  }

  const filterWith = {
    _id: id,
    userId: user._id,
  };

  const updateContentWith = { title, content };

  const updateOptions = {
    new: true,
  };

  NotesModel.findOneAndUpdate(filterWith, updateContentWith, updateOptions, (err, updatedDoc) => {
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

const getNotesController = (req, res) => {
  NotesModel.find({}, (err, docs) => {
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

module.exports = {
  addNoteController,
  getNotesController,
  updateNoteWithIdController,
  getNoteWithIdController,
};
