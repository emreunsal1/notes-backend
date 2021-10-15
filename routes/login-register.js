const router = require('express').Router();
const { registerController } = require('../controllers/login-register');
const { checkUserExistsMiddleware } = require('../middlewares/userMiddlewares');

router.get('/register', checkUserExistsMiddleware, registerController);

module.exports = router;
