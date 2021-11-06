const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(8)
    .alphanum().trim()
    .required(),
  password: Joi.string().min(8).trim().alphanum()
    .required(),
});

const validateUser = (user) => userSchema.validate(user);

module.exports = {
  validateUser,
};
