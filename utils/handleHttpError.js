export const handleHttpError = (res, message = "Algo sucedio", code = 403) => {
  res.status(code).json({
    success: false,
    errors: [message],
  });
};
