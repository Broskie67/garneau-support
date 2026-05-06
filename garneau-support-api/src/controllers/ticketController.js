const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const { Op } = require('sequelize')
const User = require('../models/user');
const Ticket = require('../models/ticket')

/**
 * Recherche la liste des incidents créé par le client
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns la liste des incidents créés par le client
 */
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

/**
 * Recherche la liste des incidents qui sont assignées au 
 * technicien ainsi que ceux sans assignations 
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns la liste des incidents assignés au technicien
 */
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

/**
 * Recherche la liste de tous les incidents 
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns la liste de tous les incidents
 */
exports.getAllTickets = async (req, res, next) => {
  try {
    const allTickets = await Ticket.findAll({
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
      allTickets,
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
 * Cherche l'incident recherché par l'utilisateur
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns L'incident recherché ou une erreur
 */
exports.getTicket = async (req, res, next) => {
  const ticketId = req.params.id
  try {
    const userId = req.user.id

    const ticket = await Ticket.findOne({  
      where: { id: ticketId },
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

/**
 * Auto-assignation d'un incident par le technicien
 * 
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express  
 * @returns L'incident assigné au technicien concerné ou une erreur
 */
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
    ticket.status = 'Assigné'

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

/**
 * Création d'un nouvel incident par le client
 * 
 * @param {Object} req Requête Express
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express
 * @returns Un nouvel incident créé ou une erreur
 */
exports.createTicket = async (req, res, next) => {
  const { title, description, category, priority } = req.body
  try {
    const userId = req.user.id
    
    const newTicket = await Ticket.create({
      title: title,
      description: description,
      category: category,
      priority: priority,
      status: 'Ouvert',
      created_by: userId,
      assigned_to: null,
    })

    return res.status(201).json(formatValidResponse(
      201,
      'Incident créé avec succès',
      newTicket,
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
 * Modifie un incident selon le rôle de l'utilisateur connecté
 * 
 * Le client peut seulement modifier le statut de ses propres incidents.
 * Le technicien peut modifier les incidents qui lui sont assignés.
 * L'admin peut modifier l'ensemble des champs autorisés.
 * @param {Object} req Requête Express 
 * @param {Object} res Réponse Express
 * @param {Function} next Middleware Express 
 * @returns {Promise<Object>} Réponse JSON contenant l'incident modifié ou une erreur
 */
exports.updateTicket = async(req, res, next) => {
  const ticketId = req.params.id
  const userId = req.user.id
  const userRole = req.user.role

  const allowedCategories = ['Matériel', 'Logiciel', 'Réseau', 'Accès et comptes', 'Courriel', 'Impression', 'Sécurité', 'Téléphonie', 'Autre']
  const allowedStatus = ['Ouvert','Assigné','En cours','En attente','Résolu','Fermé','Archivé']
  const allowedPriorities = ['Basse', 'Moyenne', 'Haute', 'Critique']

  const allowedStatusTransitionClient = {
    'Résolu': [
      { to: 'En cours', roles: ['client', 'admin'] },
      { to: 'Fermé', roles: ['client', 'admin'] }
    ]
  }

  const allowedStatusTransitionTech = {
    'Ouvert': [
      { to: 'Assigné', roles: ['admin', 'technicien'] }
    ],
    'Assigné': [
      { to: 'En cours', roles: ['admin', 'technicien'] }
    ],
  
    'En cours': [
      { to: 'En attente', roles: ['admin', 'technicien'] },
      { to: 'Résolu', roles: ['admin', 'technicien'] }
    ],
    'En attente': [
      { to: 'En cours', roles: ['admin', 'technicien'] }
    ]
  }

  const allowedStatusTransitionAdmin = {
    'Ouvert': [
      { to: 'Assigné', roles: ['admin', 'technicien'] }
    ],
    'Assigné': [
      { to: 'En cours', roles: ['admin', 'technicien'] }
    ],
  
    'En cours': [
      { to: 'En attente', roles: ['admin', 'technicien'] },
      { to: 'Résolu', roles: ['admin', 'technicien'] }
    ],
    'En attente': [
      { to: 'En cours', roles: ['admin', 'technicien'] }
    ],
    'Résolu': [
      { to: 'En cours', roles: ['client', 'admin'] },
      { to: 'Fermé', roles: ['client', 'admin'] }
    ],
    'Fermé': [
      { to: 'Archivé', roles: ['admin']}
    ]
  }

  try {
    const ticket = await Ticket.findOne({  
      where: { id: ticketId },
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
    if(!ticket) {
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

    if(userRole === 'client' && ticket.created_by !== userId) {
      return res
        .status(403)
        .json(
          formatErrorResponse(
            403,
            'Forbidden',
            'Vous n\'avez pas les droits de modifier cet incident',
            req.originalUrl
          )
        )
    }

    if(userRole === 'technicien' && ticket.assigned_to !== userId) {
      return res
        .status(403)
        .json(
          formatErrorResponse(
            403,
            'Forbidden',
            'Vous ne pouvez modifier que les incidents qui vous sont assignés',
            req.originalUrl
          )
        )
    }

    if(userRole === 'client') {
      return await updateByClient(req, res, ticket, allowedStatusTransitionClient)
    }

    if(userRole === 'technicien') {
      return await updateByTech(req, res, ticket, allowedCategories, allowedStatus, allowedPriorities, allowedStatusTransitionTech)
    }
    
    if(userRole === 'admin') {
      return await updateByAdmin(req, res, ticket, allowedCategories, allowedStatus, allowedPriorities, allowedStatusTransitionAdmin)
    }

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

/**
 * Modifie les champs autorisés pour un client
 * 
 * @param {Object} req - Requete Express
 * @param {Object} res - Réponse Express 
 * @param {Object} ticket - l'incident à modifié
 * @returns {Promise<Object>} Réponse JSON contenant l'incident ou une erreur
 */
async function updateByClient(req, res, ticket, allowedStatusTransitionClient) {
  const { status } = req.body
  

  if(status === undefined) {
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'Le statut est requis pour modifier un incident',
        req.originalUrl
      )
    ) 
  }
  if(status !== ticket.status) {
    const transitions = allowedStatusTransitionClient[ticket.status] || []

    const isAllowed = transitions.some(transition => 
      transition.to === status && 
      transition.roles.includes('client')
    )

    if(!isAllowed) {
      return res.status(422).json(
        formatErrorResponse(
          422,
          'Unprocessable Entity',
          'Transition de statut non autorisée',
          req.originalUrl
        )
      )
    }
  }
  
  if (status !== undefined) {
    ticket.status = status
  }

  const updatedTicket = await ticket.save()

  return res.status(200).json(formatValidResponse(
    200,
    `Le status de l\'incident a été modifié pour ${status}`,
    updatedTicket,
    req.originalUrl
  ))
}

/**
 * Modifie les champs autorisés pour un technicien
 * 
 * @param {Object} req - Requete Express
 * @param {Object} res - Réponse Express 
 * @param {Object} ticket - l'incident à modifié
 * @returns {Promise<Object>} Réponse JSON contenant l'incident ou une erreur
 */
async function updateByTech(req, res, ticket, allowedCategories, allowedStatus, allowedPriorities, allowedStatusTransitionTech) {
  const { category, priority, status } = req.body

  if(category === undefined ) {
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'La catégorie est requise pour modifier un incident',
        req.originalUrl
      )
    )
  }

  if(!allowedCategories.includes(category)) {
    return res.status(422).json(
      formatErrorResponse(
        422,
        'Unprocessable Entity',
        'Catégorie invalide',
        req.originalUrl
      )
    )
  }

  if(priority === undefined) {
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'La priorité est requise pour modifier un incident',
        req.originalUrl
      )
    )
  }

  if(!allowedPriorities.includes(priority)) {
    return res.status(422).json(
      formatErrorResponse(
        422,
        'Unprocessable Entity',
        'Priorité invalide',
        req.originalUrl
      )
    )
  }

  if(status === undefined) {
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'Le statut est requis pour modifier un incident',
        req.originalUrl
      )
    )
  }

  if(!allowedStatus.includes(status)) {
    return res.status(422).json(
      formatErrorResponse(
        422,
        'Unprocessable Entity',
        'Statut invalide',
        req.originalUrl
      )
    )
  }
  if(status !== ticket.status) {
    const transitions = allowedStatusTransitionTech[ticket.status] || []

    const isAllowed = transitions.some(transition => 
      transition.to === status && 
      transition.roles.includes('technicien')
    )

    if(!isAllowed) {
      return res.status(422).json(
        formatErrorResponse(
          422,
          'Unprocessable Entity',
          'Transition de statut non autorisée',
          req.originalUrl
        )
      )
    }
  }
  
 if (category !== undefined) {
    ticket.category = category
  }
  
  if (priority !== undefined) {
    ticket.priority = priority
  }

  if (status !== undefined) {
    ticket.status = status
  }

  const updatedTicket = await ticket.save()

  return res.status(200).json(formatValidResponse(
    200,
    'L\'incident a bien été modifié',
    updatedTicket,
    req.originalUrl
  ))
}

/**
 * Modifie les champs autorisés pour un admin
 * 
 * @param {Object} req - Requete Express
 * @param {Object} res - Réponse Express 
 * @param {Object} ticket - l'incident à modifié
 * @returns {Promise<Object>} Réponse JSON contenant l'incident ou une erreur
 */
async function updateByAdmin(req, res, ticket, allowedCategories, allowedStatus, allowedPriorities, allowedStatusTransitionAdmin) {
  const { assigned_to, category, priority, status } = req.body

  if(assigned_to === undefined){
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'l\'assignation a un autre technicien est requis ',
        req.originalUrl
      )
    ) 
  }

  if(category === undefined) {
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'La catégorie est requise pour modifier un incident',
        req.originalUrl
      )
    )
  }

  if(!allowedCategories.includes(category)) {
    return res.status(422).json(
      formatErrorResponse(
        422,
        'Unprocessable Entity',
        'Catégorie invalide',
        req.originalUrl
      )
    )
  }

  if(priority === undefined) {
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'La priorité est requise pour modifier un incident',
        req.originalUrl
      )
    )
  }

  if(!allowedPriorities.includes(priority)) {
    return res.status(422).json(
      formatErrorResponse(
        422,
        'Unprocessable Entity',
        'Priorité invalide',
        req.originalUrl
      )
    )
  }

  if(status === undefined) {
    return res.status(400).json(
      formatErrorResponse(
        400,
        'Bad Request',
        'Le statut est requis pour modifier un incident',
        req.originalUrl
      )
    )
  }

  if(!allowedStatus.includes(status)) {
    return res.status(422).json(
      formatErrorResponse(
        422,
        'Unprocessable Entity',
        'Statut invalide',
        req.originalUrl
      )
    )
  }
  if(status !== ticket.status){
    const transitions = allowedStatusTransitionAdmin[ticket.status] || []

    const isAllowed = transitions.some(transition => 
      transition.to === status && 
      transition.roles.includes('admin')
    )

    if(!isAllowed) {
      return res.status(422).json(
        formatErrorResponse(
          422,
          'Unprocessable Entity',
          'Transition de statut non autorisée',
          req.originalUrl
        )
      )
    }
  }
  
  if (assigned_to !== undefined) {
    ticket.assigned_to = assigned_to
  }

  if (category !== undefined) {
    ticket.category = category
  }

  if (priority !== undefined) {
    ticket.priority = priority
  }

  if (status !== undefined) {
    ticket.status = status
  }

  const updatedTicket = await ticket.save()

  return res.status(200).json(formatValidResponse(
    200,
    'L\'incident bien été modifié',
    updatedTicket,
    req.originalUrl
  ))
}

