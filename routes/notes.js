const router = require('express').Router();

// controllers
const {
  getNotesController, addNoteController, updateNoteWithIdController, getNoteWithIdController, deleteNoteWithIdController,
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
router.put('/:id', authRequiredMiddleware, validateNoteMiddleware, updateNoteWithIdController);

// Delete Note
router.delete('/:id', authRequiredMiddleware, deleteNoteWithIdController);

module.exports = router;
