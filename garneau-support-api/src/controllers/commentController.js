const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const { Op } = require('sequelize')
const User = require('../models/user')
const Ticket = require('../models/ticket')
const Comment = require('../models/comment')

/**
 * Récupère la liste de tous les commentaires liée à un incident
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns {Promise<Object>} La liste JSON des commentaires liée à un incident. 
 * Retourne une erreur dans le cas d'un échec
 */
exports.getTicketComments = async (req, res, next) => {
  const ticketId = req.params.id
  try {
    const userId = req.user.id

    const allTicketComments = await Comment.findAll({
      where: { ticket_id: ticketId },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'first_name', 'last_name']
        }
      ]
    })

    return res.status(200).json(formatValidResponse(
      200,
      'La liste des incidents a été récupéré avec succès',
      allTicketComments,
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
 * Crée un nouveau commentaire dans l'incident qui lui est lié
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns {Promise<Object>} La reponse JSON du nouveau commentaire créé. 
 * Retourne une erreur dans le cas d'un échec
 */
exports.createComment = async (req, res, next) => {
  const { content, type } = req.body
  const ticketId = req.params.id
  try {
    const userId = req.user.id
    const userRole = req.user.role

    const commentType = userRole === 'client' ? 'Public' : req.body.type
    
    const newComment = await Comment.create({
      content: content,
      attachment: req.file ? req.file.filename : null,
      type: commentType,
      created_by: userId,
      ticket_id: ticketId
    })

    return res.status(201).json(formatValidResponse(
      201,
      'Commentaire envoyé avec succès',
      newComment,
      req.originalUrl
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

