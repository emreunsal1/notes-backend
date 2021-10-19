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
  _id: mongoose.Types.ObjectId,
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
