export const validateDatosUser = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    const formattedError = err.errors.map((error) => error.message).join(", ");
    res.status(400).json({ message: formattedError });
  }
};
