const router = require('express').Router();

// controllers
const {
  getNotesController, addNoteController, updateNoteWithIdController, getNoteWithIdController,
} = require('../controllers/notes');

// middlewares
const { authRequiredMiddleware } = require('../middlewares/authMiddlewares');
const { validateNoteMiddleware } = require('../middlewares/noteMiddlewares');

// Get Note
router.get('/', getNotesController);
router.get('/:id', getNoteWithIdController);

// Add Note
router.post('/', authRequiredMiddleware, validateNoteMiddleware, addNoteController);

// Update Note
router.put('/:id', authRequiredMiddleware, updateNoteWithIdController);

module.exports = router;
