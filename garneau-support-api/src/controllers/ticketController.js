const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const User = require('../models/user');
const Ticket = require('../models/ticket')

exports.getTickets = async (req, res, next) => {
  try {
    const userId = req.user.id

    const allTicket = await Ticket.findAll({ where: { created_by: userId }, 
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
    
    console.log('Utilisateur connecté:', userId)
    return res.status(200).json(formatValidResponse(
      200,
      'La liste des incidents a été récupéré avec succès',
      allTicket,
      req.originalUrl
    ))
    
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
