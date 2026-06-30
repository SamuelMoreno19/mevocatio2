const { body, validationResult } = require("express-validator");

/**
 * Ejecuta los resultados de validación.
 * Si hay errores los retorna como 400 con detalle por campo.
 */
const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg })),
    });
  }
  next();
};

/* ─────────────────────────────────────────
   REGLAS POR RUTA
───────────────────────────────────────── */

const reglasRegister = [
  body("name")
    .exists().withMessage("El nombre es obligatorio.")
    .bail()
    .isString().withMessage("El nombre debe ser texto.")
    .bail()
    .trim()
    .escape()
    .notEmpty().withMessage("El nombre es obligatorio.")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres.")
    .isLength({ max: 100 }).withMessage("El nombre no puede superar 100 caracteres."),

  body("email")
    .exists().withMessage("El email es obligatorio.")
    .bail()
    .isString().withMessage("El email debe ser texto.")
    .bail()
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage("El email es obligatorio.")
    .isEmail().withMessage("Ingresa un email válido."),

  body("password")
    .exists().withMessage("La contraseña es obligatoria.")
    .bail()
    .isString().withMessage("La contraseña debe ser texto.")
    .bail()
    .notEmpty().withMessage("La contraseña es obligatoria.")
    .isLength({ min: 7 }).withMessage("La contraseña debe tener mínimo 7 caracteres.")
    .isLength({ max: 72 }).withMessage("La contraseña no puede superar 72 caracteres.")
    .matches(/(?=(?:.*\d){2,})/).withMessage("La contraseña debe tener al menos 2 números."),

  validar,
];

const reglasLogin = [
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage("El email es obligatorio.")
    .isEmail().withMessage("Ingresa un email válido."),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria."),

  validar,
];

const reglasForgotPassword = [
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage("El email es obligatorio.")
    .isEmail().withMessage("Ingresa un email válido."),

  validar,
];

const reglasResetPassword = [
  body("token")
    .exists().withMessage("El token es obligatorio.")
    .bail()
    .isString().withMessage("El token debe ser texto.")
    .bail()
    .trim()
    .notEmpty().withMessage("El token es obligatorio."),

  body("newPassword")
    .exists().withMessage("La nueva contraseña es obligatoria.")
    .bail()
    .isString().withMessage("La nueva contraseña debe ser texto.")
    .bail()
    .notEmpty().withMessage("La nueva contraseña es obligatoria.")
    .isLength({ min: 7 }).withMessage("La contraseña debe tener mínimo 7 caracteres.")
    .isLength({ max: 72 }).withMessage("La contraseña no puede superar 72 caracteres.")
    .matches(/(?=(?:.*\d){2,})/).withMessage("La contraseña debe tener al menos 2 números."),

  validar,
];

module.exports = {
  reglasRegister,
  reglasLogin,
  reglasForgotPassword,
  reglasResetPassword,
};