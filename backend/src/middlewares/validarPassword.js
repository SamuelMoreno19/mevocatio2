/**
 * Valida que la contraseña tenga mínimo 7 caracteres y al menos 2 números.
 * Se usa como middleware en las rutas de register y reset-password.
 */
const validarPassword = (req, res, next) => {
  const password = req.body.password || req.body.newPassword;
  const regex = /^(?=(?:.*\d){2,}).{7,}$/;

  if (!password || !regex.test(password)) {
    return res.status(400).json({
      error: "La contraseña debe tener mínimo 7 caracteres y al menos 2 números",
    });
  }

  next();
};

module.exports = { validarPassword };
