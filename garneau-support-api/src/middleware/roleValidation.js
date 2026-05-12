const { formatErrorResponse } = require('../utils/formatErrorResponse');

/**
 * Vérifie que l'utilisateur connecté est un administrateur.
 *
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 401 si l'utilisateur n'est pas authentifié ou 403 s'il n'est pas administrateur
 */
function isAdmin(req, res, next) {
  if(!req.user) {
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
  if(req.user.role !== 'admin'){
    return res
      .status(403)
      .json(
        formatErrorResponse(
          403,
          'Forbidden',
          'Vous n\'avez pas les authorisation nécéssaire pour cette ressource',
          req.originalUrl
        )
      );
  }
  next()
} 

/**
 * Vérifie que l'utilisateur connecté est un technicien.
 *
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 401 si l'utilisateur n'est pas authentifié ou 403 s'il n'est pas technicien
 */
function isTechnician(req, res, next) {
  if(!req.user) {
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
  if(req.user.role !== 'technicien'){
    return res
      .status(403)
      .json(
        formatErrorResponse(
          403,
          'Forbidden',
          'Vous n\'avez pas les authorisation nécéssaire pour cette ressource',
          req.originalUrl
        )
      );
  }
  next()
}

/**
 * Vérifie que l'utilisateur connecté est un client.
 *
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware suivant
 * @returns Une erreur 401 si l'utilisateur n'est pas authentifié ou 403 s'il n'est pas client
 */
function isClient(req, res, next) {
  if(!req.user) {
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
  if(req.user.role !== 'client'){
    return res
      .status(403)
      .json(
        formatErrorResponse(
          403,
          'Forbidden',
          'Vous devez être un client pour accéder à cette ressource',
          req.originalUrl
        )
      );
  }
  next()
}

module.exports = {
  isAdmin,
  isTechnician,
  isClient
}