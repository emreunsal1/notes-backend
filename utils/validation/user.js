const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum().trim().required(),
  password: Joi.string().trim().alphanum().required(),
});

const validateUser = (user) => {
  const validatedData = userSchema.validate(user);
  return validatedData;
};

module.exports = {
  validateUser,
};
