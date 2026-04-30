const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const User = require('../models/user')
const bcrypt = require('bcrypt')
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

    return res.status(200).json(formatValidResponse(
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

exports.createTech = async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res  
        .status(409)
        .json(
          formatErrorResponse(
            409,
            "Conflict",
            "Un utilisateur avec ce courriel existe déjà.", 
            req.originalUrl
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newTech = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password_hash: hashedPassword,
      phone_number: phoneNumber,
      role: 'technicien'
    })

    const returnedTech = {
      id: newTech.id,
      first_name: newTech.first_name,
      last_name: newTech.last_name,
      email: newTech.email,
      phone_number: newTech.phone_number,
      role: newTech.role,
      is_active: newTech.is_active
    }

    return res
      .status(201)
      .json(
        formatValidResponse(
          201,
          "Techniciens créé avec succès.",
          returnedTech,
          req.originalUrl
        )
      );

  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}
