const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  //this is a example of clouser, since this method return a midleware create on runtime
  return (req, res, next) => {
    const data = req[property];//we use this form because the informatio would come on req.body || req.params|| req.query
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = { validatorHandler };
