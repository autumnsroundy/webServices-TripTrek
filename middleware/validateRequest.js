const Validator = require("validatorjs");

const validateRequest = (rules) => {
  return (req, res, next) => {
    const validation = new Validator(req.body, rules);

    validation.passes(() => next());
    validation.fails(() => {
      res.status(400).json({
        message: "Validation failed",
        errors: validation.errors.all()
      });
    });
  };
};

module.exports = validateRequest;
