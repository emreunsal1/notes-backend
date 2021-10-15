const authRequiredMiddleware = (req, res, next) => {
  const authToken = req.cookies.auth_key;
  if (authToken) {
    return next();
  }
  return res.status(401).send({
    success: false,
    message: 'Not authorized',
  });
};

module.exports = {
  authRequiredMiddleware,
};
