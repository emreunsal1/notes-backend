const mongoose = require('mongoose');

require('dotenv').config();

const { DATABASE_CONNECTION_STRING } = process.env;

// mongoose.set('debug', true);

const {
  notesModelName, usersModelName, notesSchema, usersSchema,
} = require('./models');

async function connectDb() {
  await mongoose.connect(DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

connectDb().catch((error) => console.log({
  message: 'DatabaseConnectionError',
  error,
}));

const NotesModel = mongoose.model(notesModelName, notesSchema);
const UsersModel = mongoose.model(usersModelName, usersSchema);

module.exports = {
  NotesModel,
  UsersModel,
};
