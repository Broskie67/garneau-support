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

exports.updateUserActiveStatus = async (req, res, next) => {
  const userId = req.params.id
  try{
    const user = await User.findOne({ where: { id: userId } })
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

    user.is_active = user.is_active ? 0 : 1

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

    if(user.is_active === true) {
      return res.status(200).json(formatValidResponse(
        200,
        'Le compte a bien été activé',
        returnedUser,
        req.originalUrl
      ))
    }

    if(user.is_active === false) {
      return res.status(200).json(formatValidResponse(
        200,
        'Le compte a bien été désactivé',
        returnedUser,
        req.originalUrl
      ))
    }

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.adminController = {
  getUsers: exports.getUsers,
  updateUserActiveStatus: exports.updateUserActiveStatus

}