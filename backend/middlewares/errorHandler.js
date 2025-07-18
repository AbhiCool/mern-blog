const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = "Something went wrong";
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
