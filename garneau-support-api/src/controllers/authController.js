const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Crée un nouvel utilisateur et le connecte à son compte
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns l'utilisateur connecté. Retourne une erreur dans 
 * le cas contraire
 */
exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res  
        .status(409)
        .json(
          formatErrorResponse(
            409,
            "Conflict",
            "Un utilisateur avec ce courriel existe déjà.", 
            req.originalUrl
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_hash: hashedPassword,
      phone_number: phoneNumber,
      role: 'client'
    });

    const token = jwt.sign(
      { 
        userId: newUser.id,
        role: newUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res
      .status(201)
      .json(
        formatValidResponse(
          201,
          "Utilisateur créé avec succès.",
          {
            user: {
              id: newUser.id,
              first_name: newUser.firstName,
              last_name: newUser.lastName,
              email: newUser.email,
              phone_number: newUser.phoneNumber,
              role: 'client'
            },
            token: token,
          },
          req.originalUrl
        )
      );

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

/**
 * Connecte un utilisateur à son compte
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns L'utilisateur connecté. Retourne une erreur dans 
 * le cas contraire
 */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
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

  try {
    const user = await User.findOne({ where: { email: email } }); 
    if (!user) {
      return res
        .status(401)
        .json(
          formatErrorResponse(
            401,
            "Unauthorized",
            "Identifiants invalides.", 
            req.originalUrl
          )
        );
    }

    if (!user.is_active) {
      return res
        .status(403)
        .json(
          formatErrorResponse(
            403,
            "Forbidden",
            "Votre compte est inactif. Veuillez contacter le support.", 
            req.originalUrl
          )
        );
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res
        .status(401)
        .json(
          formatErrorResponse(
            401,
            "Unauthorized",
            "Identifiants invalides.", 
            req.originalUrl
          )
        );
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res
      .status(200)
      .json(
        formatValidResponse(
          200,
          "Connexion réussie.",
          {
            user: {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              phone_number: user.phone_number,
              role: user.role,
              is_active: user.is_active
            },
            token: token,
          },  
          req.originalUrl
        )
      );
    } catch (error) {
      if(!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
}

/**
 * Vérifie si un compte a le même email lors de
 * la création d'un nouveau compte
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns Retourne True si le courriel existe déjà, False
 * si le courriel n'existe pas 
 */
exports.checkEmail = async (req, res, next) => {
  const { email } =  req.body

  try {
    if (!email || email.trim().length === 0) {
      return res
        .status(422)
        .json(
          formatErrorResponse(
            422,
            'Unprocessable Entity',
            'Le courriel est requis',
            req.originalUrl
          )
        )
    }
    const trimmedEmail = email.trim().toLowerCase()

    const existingUser = await User.findOne({ where: { email: trimmedEmail } });
    if (existingUser) {
      return res  
        .status(200)
        .json(
          formatValidResponse(
            200,
            'La vérification du courriel a été executé avec succès',
            {
              exists: true
            },
            req.originalUrl
          )
        );
    }

    return res  
      .status(200)
      .json(
        formatValidResponse(
          200,
          'La vérification du couriel a été executé avec succès',
          {
            exists: false
          },
          req.originalUrl
        )
    );
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
