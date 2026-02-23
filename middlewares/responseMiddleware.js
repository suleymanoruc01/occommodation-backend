const successResponse = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

const errorResponse = (
  res,
  message = "Internal server error",
  status = 500,
  error = null
) => {
  if (error) {
    console.error("[ERROR]", message, error);
  } else {
    console.error("[ERROR]", message);
  }

  return res.status(status).json({
    success: false,
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
