const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user')
const Ticket = require('./ticket')

const comment = sequelize.define(
  'comments',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate :{
        len: {
          args:[3],
          msg: 'Le commentaire doit contenir au moins 3 caractères'
        }
      }
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },

    type: {
      type: DataTypes.ENUM('Public', 'Interne'),
      allowNull: false,
      defaultValue: 'Public'
    }
  }, 
  {
    timestamps: true
  }
)

comment.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'author'
})

comment.belongsTo(Ticket, {
  foreignKey: 'ticket_id',
  as: 'ticket'
})

User.hasMany(comment, {
  foreignKey: 'created_by',
  as: 'comments'
})

Ticket.hasMany(comment, {
  foreignKey: 'ticket_id',
  as: 'comments'
})

module.exports = comment