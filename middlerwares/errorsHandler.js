
function logError(err, req, res, next) {
  console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }

  next();
}
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

module.exports = { logError, boomErrorHandler, errorHandler };
