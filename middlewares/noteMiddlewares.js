const { createErrorMessage } = require('../utils/createMessage');
const { validateNote } = require('../utils/validation/note');

const validateNoteMiddleware = (req, res, next) => {
  const validatedNote = validateNote(req.body);
  console.log(validatedNote);
  if (validatedNote.error) {
    return res.send(createErrorMessage(validatedNote.error.message));
  }
  return next();
};

module.exports = {
  validateNoteMiddleware,
};
