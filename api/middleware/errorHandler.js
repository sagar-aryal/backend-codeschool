import customError from "../utils/customError.js";

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  // Log to console for dev
  // console.log(err.stack);

  console.log(err);

  // Type of error
  //console.log(err.name);

  // Mongoose bad ObjectId error
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new customError(message, 404);
  }

  // Mongoose duplicate fields error
  if (err.name === "MongoServerError") {
    const message = `Duplicate fields found`;
    error = new customError(message, 400);
  }

  // Mongoose field validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new customError(message, 400);
  }

  res
    .status(error.status || 500)
    .json({ success: false, error: error.message || "Server error" });
};

export default errorHandler;
