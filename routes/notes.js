const router = require('express').Router();
const { getNotesController, addNoteController } = require('../controllers/notes');
const { authRequiredMiddleware } = require('../middlewares/authMiddlewares');

router.get('/', getNotesController);
router.post('/', authRequiredMiddleware, addNoteController);

module.exports = router;
