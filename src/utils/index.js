

exports.isEmptyWithZero = val => !val && val !== 0

exports.handleResponse = (res, statusCode, message, data = null) => {
  let success = res >= 200 && statusCode <300
  return res.status(statusCode).json({success, message, data})
};