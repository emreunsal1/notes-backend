const db = require('../db');

const addNoteController = (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    title,
    content,
  };
  db.notes.insert(newNote, (err, newDoc) => {
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

const getNotesController = (req, res) => {
  res.send(db.notes.getAllData());
};

module.exports = {
  addNoteController,
  getNotesController,
};
