const { createErrorMessage } = require('../utils/createMessage');
const { validateNote } = require('../utils/validation/note');

const validateNoteMiddleware = (req, res, next) => {
  const { title, content } = req.body;

  const validatedNote = validateNote({ title, content });
  if (validatedNote.error) {
    return res.send(createErrorMessage(validatedNote.error.message));
  }
  return next();
};

module.exports = {
  validateNoteMiddleware,
};
