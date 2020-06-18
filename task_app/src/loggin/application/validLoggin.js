const Joi = require('@hapi/joi');

// eslint-disable-next-line import/no-commonjs
module.exports = (logging) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(logging);
};
