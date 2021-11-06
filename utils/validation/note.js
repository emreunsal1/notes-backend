const Joi = require('joi');
const { postColors } = require('../../constants');

const {
  BLUE, GREEN, PURPLE, RED,
} = postColors;

const noteSchema = Joi.object({
  title: Joi.string()
    .alphanum().trim().required(),
  content: Joi.string().trim().default(''),
  color: Joi.valid(BLUE, GREEN, PURPLE, RED).default('blue'),
});

const validateNote = (note) => {
  const validatedData = noteSchema.validate(note);
  return validatedData;
};

module.exports = {
  validateNote,
};
