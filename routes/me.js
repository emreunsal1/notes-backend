const router = require('express').Router();
const { getMyNotesController, getMeController } = require('../controllers/me');
const { authRequiredMiddleware } = require('../middlewares/authMiddlewares');

router.get('/', authRequiredMiddleware, getMeController);
router.get('/notes', authRequiredMiddleware, getMyNotesController);

module.exports = router;
