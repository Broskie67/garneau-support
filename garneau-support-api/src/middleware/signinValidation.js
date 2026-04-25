const { formatErrorResponse } = require("../utils/formatErrorResponse");

function signinValidation(req, res, next) {
  const { email, password } = req.body;
  const trimmedEmail = email ? email.trim().toLowerCase() : '';

  if (!trimmedEmail || !password) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le courriel et le mot de passe sont requis.", 
          req.originalUrl
        )
      );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res
        .status(422)
        .json(
          formatErrorResponse(
            422,
            "Unprocessable Entity",
            "Le format du courriel est invalide.", 
            req.originalUrl
          )
        );
    }

    req.body.email = trimmedEmail;

  next();
}

module.exports = signinValidation;
