const { formatErrorResponse, formatValidResponse } = require('../utils/formatErrorResponse');
const User = require('../models/user');

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

exports.profileController = {
  getProfile: exports.getProfile
}