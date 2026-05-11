const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const { Op } = require('sequelize')
const User = require('../models/user')
const Ticket = require('../models/ticket')
const Comment = require('../models/comment')

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

exports.createComment = async (req, res, next) => {
  const { content, attachment, type } = req.body
  const ticketId = req.params.id
  try {
    const userId = req.user.id

    const newComment = await Comment.create({
      content: content,
      attachment: attachment,
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

