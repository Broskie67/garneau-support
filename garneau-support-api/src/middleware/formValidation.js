const { formatErrorResponse } = require("../utils/formatErrorResponse");

/**
 * Valide les champs du formulaire de connexion
 * 
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 422 si les champs sont invalides, sinon passe au middleware suivant
 */
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

/**
 * Valide les champs du formulaire dd'inscription
 * 
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 422 si les champs sont invalides, sinon passe au middleware suivant
 */
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
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

  const phoneNumberRegex = /^(\+1\s?)?(\(?[2-9][0-9]{2}\)?[\s.-]?)?[2-9][0-9]{2}[\s.-]?[0-9]{4}$/;
    if (!phoneNumberRegex.test(trimmedPhoneNumber)) {
      return res
        .status(422)
        .json(
          formatErrorResponse(
            422,
            "Unprocessable Entity",
            "Le format du numéro de téléphone est invalide. Il doit etre de format canadien",
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

/**
 * Valide les champs du formulaire de création d'un incident
 * 
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 422 si les champs sont invalides, sinon passe au middleware suivant
 */
function ticketValidation(req, res, next) {
  const { title, description, category, priority } = req.body
  const trimmedTitle = title ? title.trim() : '';
  const trimmedDescription = description ? description.trim(): '';

  const includeCategories = [
    'Matériel', 
    'Logiciel', 
    'Réseau', 
    'Accès et comptes', 
    'Courriel',
    'Impression',
    'Sécurité',
    'Téléphonie',
    'Autre'
  ]

  const includePrioritie = [
    'Basse',
    'Moyenne',
    'Haute',
    'Critique'
  ]
  
  if(!trimmedTitle || !trimmedDescription || !priority){
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Tous les champs sont requis", 
          req.originalUrl
        )
      );
  }

  if(trimmedTitle.length < 3 || trimmedTitle.length > 100) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le titre doit contenir entre 3 et 100 caractères.", 
          req.originalUrl
        )
      );
  }

  if(trimmedDescription.length < 10) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "La description doit contenir au minimum 10 caractères", 
          req.originalUrl
        )
      );
  }

  if(category && !includeCategories.includes(category)){
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          `${category} n'est pas valide. Veuillez choisir une catégorie parmi la liste : 
            (Matériel, Logiciel, Réseau, Accès et comptes, Courriel, Impression, Sécurité,
            Téléphonie, Autre)`, 
          req.originalUrl
        )
      );
  }

  if(!includePrioritie.includes(priority)) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          `${priority} n'est pas valide. Veuillez choisir une priorité parmi la liste : 
            (Basse, Moyenne, Haute, Critique)`, 
          req.originalUrl
        )
      );
  }

  req.body.title = trimmedTitle;
  req.body.description = trimmedDescription;

  next()
}

/**
 * Valide les champs du formulaire de modification du profil utilisateur
 * 
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 422 si les champs sont invalides, sinon passe au middleware suivant
 */
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

  const phoneNumberRegex = /^(\+1\s?)?(\(?[2-9][0-9]{2}\)?[\s.-]?)?[2-9][0-9]{2}[\s.-]?[0-9]{4}$/;
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

/**
 * Valide les champs du formulaire de modification du mot de passe 
 * 
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 422 si les champs sont invalides, sinon passe au middleware suivant
 */
function updatePasswordValidation(req, res, next) {
  const {currentPassword, newPassword, confirmPassword} = req.body

  if(!currentPassword || !newPassword || !confirmPassword){
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

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
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
  
    if(newPassword !== confirmPassword) {
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

    next()
}

/**
 * Valide les champs du formulaire d'ajout d'un commentaire
 * 
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 422 si les champs sont invalides, sinon passe au middleware suivant
 */
function validateComment(req, res, next) {
  const { content, type } = req.body || {}

  const trimmedContent = content ? content.trim() : ''

  if(!trimmedContent){
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le contenu est requis", 
          req.originalUrl
        )
      );
  }

  if(trimmedContent.length < 3) {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Le commmentaire doit contenir au moins 3 caractères", 
          req.originalUrl
        )
      );
  }

  if(type !== 'Public' && type !== 'Interne') {
    return res
      .status(422)
      .json(
        formatErrorResponse(
          422,
          "Unprocessable Entity",
          "Un commentaire peut être interne ou public seulement", 
          req.originalUrl
        )
      );
  }
  next()
}


module.exports = {
  signinValidation,
  signupValidation,
  ticketValidation,
  profileValidation,
  updatePasswordValidation,
  validateComment
}