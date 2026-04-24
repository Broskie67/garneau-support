const { formatErrorResponse } = require("../utils/formatErrorResponse");

function signupValidation(req, res, next) {
  const { firstname, lastname, email, phoneNumber, password, confirmPassword } = req.body;

  const trimmedFirstname = firstname ? firstname.trim() : '';
  const trimmedLastname = lastname ? lastname.trim() : '';
  const trimmedEmail = email ? email.trim().toLowerCase() : '';
  const trimmedPhoneNumber = phoneNumber ? phoneNumber.trim() : '';

  if (!trimmedFirstname || !trimmedLastname || !trimmedEmail || !trimmedPhoneNumber || !password || !confirmPassword) {
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

  if (trimmedFirstname.length < 2 || trimmedFirstname.length > 50) {
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

  if (trimmedLastname.length < 2 || trimmedLastname.length > 50) {
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

    req.body.firstname = trimmedFirstname;
    req.body.lastname = trimmedLastname;
    req.body.email = trimmedEmail;
    req.body.phoneNumber = trimmedPhoneNumber;
    req.body.password = password;
    req.body.confirmPassword = confirmPassword;

  next();
}

module.exports = signupValidation;