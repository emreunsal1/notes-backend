const router = require('express').Router();
const { getUserByIdController, getUsersController } = require('../controllers/users');

router.get('/', getUsersController);
router.get('/:id', getUserByIdController);

module.exports = router;
