const router = require('express').Router();
const { registerController, loginController } = require('../controllers/login-register');
const { checkUserExistsMiddleware, getUserWithIdPasswordMiddleware } = require('../middlewares/userMiddlewares');

router.get('/register', checkUserExistsMiddleware, registerController);

router.get('/login', getUserWithIdPasswordMiddleware, loginController);

module.exports = router;
