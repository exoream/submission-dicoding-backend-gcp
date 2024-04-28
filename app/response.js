const failResponse = (message) => ({
  status: "fail",
  message: message,
});

const successResponse = (message) => ({
  status: "success",
  message: message,
});

const successWithData = (data) => ({
  status: "success",
  data: data,
});

const successResponseWithData = (message, data) => ({
  status: "success",
  message: message,
  data: data,
});

module.exports = { failResponse, successResponse, successWithData, successResponseWithData };