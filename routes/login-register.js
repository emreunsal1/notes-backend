const router = require('express').Router();
const { registerController, loginController } = require('../controllers/login-register');
const { checkUserExistsMiddleware, getUserWithIdPasswordMiddleware, validateUserMiddleware } = require('../middlewares/userMiddlewares');

router.post('/register', validateUserMiddleware, checkUserExistsMiddleware, registerController);

router.post('/login', validateUserMiddleware, getUserWithIdPasswordMiddleware, loginController);

module.exports = router;
