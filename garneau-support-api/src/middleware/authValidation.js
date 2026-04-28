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

function signupValidation(req, res, next) {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

  const trimmedFirstName = firstName ? firstName.trim() : '';
  const trimmedLastName = lastName ? lastName.trim() : '';
  const trimmedEmail = email ? email.trim().toLowerCase() : '';
  const trimmedPhoneNumber = phoneNumber ? phoneNumber.trim() : '';

  if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedPhoneNumber || !password || !confirmPassword) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Tous les champs sont requis.", 
          req.originalUrl
        )
      );
  }

  if (trimmedFirstName.length < 2 || trimmedFirstName.length > 50) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le prénom doit contenir entre 2 et 50 caractères.", 
          req.originalUrl
        )
      );
  }

  if (trimmedLastName.length < 2 || trimmedLastName.length > 50) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le nom doit contenir entre 2 et 50 caractères.", 
          req.originalUrl
        )
      );
  }

  if(trimmedEmail.length > 50) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le courriel doit contenir au maximum 50 caractères.", 
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

  const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(trimmedPhoneNumber)) {
      return res
        .status(422)
        .json(
          formatErrorResponse(
            422,
            "Unprocessable Entity",
            "Le format du numéro de téléphone est invalide. Il doit contenir exactement 10 chiffres.(ex: 4181234567)",
            req.originalUrl
          )
        );
    }

  if(password !== confirmPassword) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Les mots de passe ne correspondent pas.", 
          req.originalUrl
        )
      );
    }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res 
        .status(422)
        .json(
          formatErrorResponse(
            422,
            "Unprocessable Entity",
            "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial.", 
            req.originalUrl
          )
        );
    }

    req.body.firstName = trimmedFirstName;
    req.body.lastName = trimmedLastName;
    req.body.email = trimmedEmail;
    req.body.phoneNumber = trimmedPhoneNumber;
    req.body.password = password;
    req.body.confirmPassword = confirmPassword;

  next();
}

module.exports = signinValidation;
module.exports = signupValidation;
