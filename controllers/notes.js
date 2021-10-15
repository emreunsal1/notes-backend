const { NotesModel } = require('../db');
const { createErrorMessage } = require('../utils/createMessage');

const addNoteController = (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    title,
    content,
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

  NotesModel.findOneAndUpdate({ _id: id }, { title, content }, (err, updatedDoc) => {
    if (err) {
      return res.status(400).send({
        ...createErrorMessage(`NoteNotUpdatedWithId: ${id}`),
        err,
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
    res.send(docs);
  });
};

const getNoteWithIdController = (req, res) => {
  const { id } = req.params;

  NotesModel.find({ _id: id }, (err, docs) => {
    if (err) {
      res.send({ ...createErrorMessage('ConnotGetNotes'), err });
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
