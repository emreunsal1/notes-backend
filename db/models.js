const mongoose = require('mongoose');

const notesModelName = 'notes';
const usersModelName = 'users';

const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: mongoose.Types.ObjectId,
}, {
  timestamps: true,
});

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  userId: mongoose.Types.ObjectId,
}, {
  timestamps: true,
});

module.exports = {
  notesModelName,
  notesSchema,
  usersModelName,
  usersSchema,
};
