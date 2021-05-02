const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    //wrong mongoose id error
    if (err.name === "castError") {
      const message = `Resource not found. Invaid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handeling Mongoose Validation Error
    if (err.name === "validationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
