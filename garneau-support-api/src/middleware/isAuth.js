const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const { formatErrorResponse } = require('../utils/formatErrorResponse');

/**
 * Vérifie que l'utilisateur est authentifié.
 *
 * Valide le token JWT reçu dans l'en-tête Authorization
 * et ajoute les informations de l'utilisateur à la requête.
 *
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 401 si le token est absent, invalide ou expiré
 */
module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if(!authHeader) {
    return res.status(401).json(formatErrorResponse(
      401,
      'Unauthorized',
      'Non authentifié',
      req.originalUrl
    ))
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      id: decodedToken.userId,
      role: decodedToken.role
    }
    next()
  } catch (error) {
    return res
      .status(401)
      .json(
        formatErrorResponse(
          401,
          'Unauthorized', 
          "Token invalide ou expiré", 
          req.originalUrl
        )
      ); 
  }
}