const { formatErrorResponse } = require("../utils/formatErrorResponse");

function profileValidation(req, res, next) {
  const {firstName, lastName, phoneNumber} = req.body

  const trimmedFirstName = firstName ? firstName.trim() : '';
  const trimmedLastName = lastName ? lastName.trim() : '';
  const trimmedPhoneNumber = phoneNumber ? phoneNumber.trim() : '';

  if (!trimmedFirstName || !trimmedLastName || !trimmedPhoneNumber) {
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
  
    req.body.firstName = trimmedFirstName;
    req.body.lastName = trimmedLastName;
    req.body.phoneNumber = trimmedPhoneNumber;

    next()
}

module.exports = profileValidation