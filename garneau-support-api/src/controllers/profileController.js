const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const bcrypt = require('bcrypt')
const User = require('../models/user');

/** Récupère le profil de l'utilisateur connecté
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns {Promise<Object>} La réponse JSON du profil de l'utilisateur connecté.
 * Retourne une erreur dans le cas d'un échec
 */
exports.getProfile = async (req, res, next) => {
  try{
    const userId = req.user.id

    const user = await User.findOne({ where: { id: userId } });
    if(!user){
      return res
        .status(404)
        .json(
          formatErrorResponse(
            404,
            'Not Found',
            'L\'utilisateur spécifié n\'éxiste pas',
            req.originalUrl
          )
        )
    }

    const returnedUser = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      is_active: user.is_active
    }

    res.status(200).json(formatValidResponse(
      200,
      'Utilisateur récupéré avec succès',
      returnedUser,
      req.originalUrl
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

/**
 * Met à jours les informations du profil de l'utilisateur
 * connecté
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns {Promise<Object>} La réponse JSON du profil de l'utilisateur connecté.
 * Retourne une erreur dans le cas d'un échec
 */
exports.updateProfile = async (req, res, next) => {
  try{
    const userId = req.user.id
    const {firstName, lastName, phoneNumber} = req.body

    const user = await User.findOne({ where: { id: userId } });
    if(!user){
      return res
        .status(404)
        .json(
          formatErrorResponse(
            404,
            'Not Found',
            'L\'utilisateur spécifié n\'éxiste pas',
            req.originalUrl
          )
        )
    }

    user.first_name = firstName
    user.last_name = lastName
    user.phone_number = phoneNumber

    const updatedUser = await user.save()

    const returnedUser = {
      id: updatedUser.id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      email: updatedUser.email,
      phone_number: updatedUser.phone_number,
      role: updatedUser.role,
      is_active: updatedUser.is_active
    }

    res.status(200).json(formatValidResponse(
      200,
      'L\'utilisateur a été modifier avec succès',
       returnedUser,
       req.originalUrl
    ))
  } catch(error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

/**
 * Met à jour le mot de passe de l'utilisateur connecté 
 * en verifiant si l'ancien mot de passe est bien le mot
 * de passe de l'utilisateur 
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns {Promise<Object>} La réponse JSON du succès de la requête
 */
exports.updatePassword = async (req, res, next) => {
  try {
    const userId = req.user.id
    const {currentPassword, newPassword, confirmPassword} = req.body

    const user = await User.findOne({ where: { id: userId } })
    if(!user) {
      return res
        .status(404)
        .json(
          formatErrorResponse(
            404,
            'Not Found',
            'L\'utilisateur spécifié n\'éxiste pas',
            req.originalUrl
          )
        )
    }

    const isSamePassword = await bcrypt.compare(currentPassword, user.password_hash)
    if(!isSamePassword) {
      return res
        .status(401)
        .json(
          formatErrorResponse(
            401,
            'Unauthorized',
            'le mot de passe actuel est incorrect',
            req.originalUrl
          )
        )
    }
    const hashNewPassword = await bcrypt.hash(newPassword, 10)

    user.password_hash = hashNewPassword

    const updatedUser = await user.save()

    res.status(200).json(formatValidResponse(
      200,
      'Le mot de passe a été modifié avec succès',
       null,
       req.originalUrl
    ))

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
