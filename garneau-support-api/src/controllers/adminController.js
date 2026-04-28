const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const User = require('../models/user')
const { Op } = require('sequelize');

exports.getUsers = async (req, res, next) => {
  try{
    const allUser = await User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'role', 'is_active'],
      where: {
        role: {
          [Op.ne]: 'admin'
        }
      }
    })

    res.status(200).json(formatValidResponse(
      200,
      'La liste des utilisateurs a été récupéré avec succès',
      allUser,
      req.originalUrl
    ))
    
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.adminController = {
  getUsers: exports.getUsers
}