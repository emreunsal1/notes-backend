const mongoose = require('mongoose');

const {
  noteColors: {
    BLUE, GREEN, PURPLE, RED,
  },
} = require('../constants');

const notesModelName = 'notes';
const usersModelName = 'users';

const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: mongoose.Types.ObjectId,
  color: {
    type: String,
    enum: [BLUE, GREEN, PURPLE, RED],
    default: BLUE,
  },
  favorited: Boolean,
}, {
  timestamps: true,
});

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
}, {
  timestamps: true,
});

module.exports = {
  notesModelName,
  notesSchema,
  usersModelName,
  usersSchema,
};
