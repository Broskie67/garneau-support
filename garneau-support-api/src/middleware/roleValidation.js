const { formatErrorResponse } = require('../utils/formatErrorResponse');


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

function isTechician(req, res, next) {
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
}

module.exports = {
  isAdmin,
  isTechician,
  isClient
}