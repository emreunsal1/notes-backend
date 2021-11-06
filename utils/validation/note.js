const Joi = require('joi');
const { noteColors } = require('../../constants');

const {
  BLUE, GREEN, PURPLE, RED,
} = noteColors;

const noteSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().trim().default(''),
  color: Joi.valid(BLUE, GREEN, PURPLE, RED).default('blue'),
  favorited: Joi.boolean().default(false),
});

const noteFavoriteSchema = Joi.object({
  favorited: Joi.boolean().required(),
});

const validateNote = (note) => noteSchema.validate(note);
const validateFavorite = ({ favorited }) => noteFavoriteSchema.validate({ favorited });

module.exports = {
  validateNote,
  validateFavorite,
};
