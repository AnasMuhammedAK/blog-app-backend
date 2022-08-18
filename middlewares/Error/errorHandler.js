//NOT FOUND ERROR
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl} The requested URL`);
  res.status(404)
  next(error);
}

//ERROR HANDLER
const errorHandler = (error, req, res, next) => {
  console.log(error)
  const statusCode = res.statusCode ? res.statusCode : 500
  //const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  })
}
module.exports = { errorHandler, notFound }
