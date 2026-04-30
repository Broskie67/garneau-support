const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
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

    const techTickets = await Ticket.findAll({ where: { assigned_to: userId },
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
