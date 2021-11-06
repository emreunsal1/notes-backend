const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum().trim().required(),
  password: Joi.string().trim().alphanum().required(),
});

const validateUser = (user) => userSchema.validate(user);

module.exports = {
  validateUser,
};
