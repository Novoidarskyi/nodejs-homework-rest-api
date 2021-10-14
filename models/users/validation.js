const Joi = require("joi");

const schemaUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(8).required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace("missing required name field"),
    });
  }
};

module.exports = {
  validationUser: (req, res, next) => {
    return validate(schemaUser, req.body, next);
  },
};
