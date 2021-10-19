const router = require('express').Router();
const {
  getNotesController, addNoteController, updateNoteWithIdController, getNoteWithIdController,
} = require('../controllers/notes');
const { authRequiredMiddleware } = require('../middlewares/authMiddlewares');

// Get Note
router.get('/', getNotesController);
router.get('/:id', getNoteWithIdController);

// Add Note
router.post('/', authRequiredMiddleware, addNoteController);

// Update Note
router.put('/:id', authRequiredMiddleware, updateNoteWithIdController);

module.exports = router;
