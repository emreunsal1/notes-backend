const router = require('express').Router();
const usersRouter = require('./users');
const notesRouter = require('./notes');
const loginRegisterRouter = require('./login-register');

router.use('/notes', notesRouter);
router.use('/users', usersRouter);
router.use('/', loginRegisterRouter);

module.exports = router;
