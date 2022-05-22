const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack);

  res
    .status(err.status || 500)
    .json({ success: false, error: err.message || "Server error" });
};

export default errorHandler;
