const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

/**
 * Controller for handling user signup. Validates input, checks for existing users, hashes the password, and creates a new user record.
 * @param {Object} req - Express request object containing user details in the body.
 * @param {Object} res - Express response object used to send back the appropriate response.
 * @param {Function} next - Express next middleware function for error handling.
 */
exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    const existingUser = await user.findOne({ where: { email: email } });
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

    const newUser = await user.create({
      first_name: firstname,
      last_name: lastname,
      email: email,
      password_hash: hashedPassword,
      phone_number: phoneNumber,
      role: 'client'
    });

    const returnUser = {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      phone_number: newUser.phone_number,
      role: newUser.role
    };

    return res
      .status(201)
      .json(
        formatValidResponse(
          201,
          "Utilisateur créé avec succès.",
          returnUser,
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
 * Controller for handling user login. Validates credentials and returns a JWT token if successful.
 * @param {Object} req - Express request object containing email and password in the body.
 * @param {Object} res - Express response object used to send back the appropriate response.
 * @param {Function} next - Express next middleware function for error handling.
 */
exports.login = async (req, res, next) => {
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
    const user = await user.findOne({ where: { email: email } }); 
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
          { token },
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

exports.authController = {
  signup: exports.signup,
  login: exports.login
};