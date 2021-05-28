"use strict";

exports.missingParans = res => {
  return res.status(200).json({ success: false, message: "Missing params" });
};

exports.resourceAlreadyExists = (res, message) => {
  return res.status(400).json({ success: false, message });
};

exports.handleResponse = (res, statusCode, message, data = null) => {
  switch (statusCode) {
    case 200:
      return res.status(statusCode).json({ success: true, message, data });

      case 201:
      return res.status(statusCode).json({ success: true, message, data });

    case 404:
      return res.status(statusCode).json({ success: false, message, data });

    default:
      return res.status(statusCode).json({ success: false, message });
  }
};

exports.handleError = (res, message) => {
  return res
    .status(500)
    .json({ success: false, message: message || "Something went wrong" });
};
