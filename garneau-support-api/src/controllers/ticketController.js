const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const { Op } = require('sequelize')
const User = require('../models/user');
const Ticket = require('../models/ticket')

exports.getClientTickets = async (req, res, next) => {
  try {
    const userId = req.user.id

    const clientTickets = await Ticket.findAll({ where: { created_by: userId }, 
      include: [
        {
          model: User,
          as: 'technicien',
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        }
      ]
    })
    
    return res.status(200).json(formatValidResponse(
      200,
      'La liste des incidents a été récupéré avec succès',
      clientTickets,
      req.originalUrl
    ))
    
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getTechnicianTickets = async (req, res, next) => {
  try {
    const userId = req.user.id

    const techTickets = await Ticket.findAll({ 
      where: {
        [Op.or]: [
          { assigned_to: userId },
          { assigned_to: null }
        ]
      },
      include: [
        {
          model: User,
          as: 'technicien',
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name']
        }
      ]
    })

    return res.status(200).json(formatValidResponse(
      200,
      'La liste des incidents a été récupéré avec succès',
      techTickets,
      req.originalUrl
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getTicket = async (req, res, next) => {
  const ticketId = req.params.id
  try {
    const userId = req.user.id

    const ticket = await Ticket.findOne({ where: { id: ticketId }})
    if(!ticket){
       return res
        .status(404)
        .json(
          formatErrorResponse(
            404,
            'Not Found',
            'L\'incident spécifié n\'éxiste pas',
            req.originalUrl
          )
        )
    }

    return res.status(200).json(formatValidResponse(
      200,
      'La l\'incidents a été récupéré avec succès',
      ticket,
      req.originalUrl
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.patchSelfAssignTicket = async (req, res, next) => {
  const ticketId = req.params.id
  try{
    const userId = req.user.id
    
    const ticket = await Ticket.findOne({ where: { id: ticketId }})
    if(!ticket){
       return res
        .status(404)
        .json(
          formatErrorResponse(
            404,
            'Not Found',
            'L\'incident spécifié n\'éxiste pas',
            req.originalUrl
          )
        )
    }
    
    ticket.assigned_to = userId

    const updatedTicket = await ticket.save()

    return res.status(200).json(formatValidResponse(
      200,
      'L\'incident vous a bien été assigné',
      updatedTicket,
      req.originalUrl
    ))
    
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
