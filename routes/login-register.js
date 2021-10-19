const router = require('express').Router();
const { registerController, loginController } = require('../controllers/login-register');
const { checkUserExistsMiddleware, getUserWithIdPasswordMiddleware } = require('../middlewares/userMiddlewares');

router.post('/register', checkUserExistsMiddleware, registerController);

router.post('/login', getUserWithIdPasswordMiddleware, loginController);

module.exports = router;
