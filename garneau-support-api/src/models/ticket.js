const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user')

const ticket = sequelize.define(
  'tickets',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validation: {
        len: {
          args: [3, 100],
          msg: 'Le titre doit contenir entre 3 et 100 caractères'
        }
      }
    },
    description: {
      type: DataTypes.STRING(),
      allowNull: false,
      validation: {
        len: {
          args: [10],
          msg: 'La description doit contenir plus de 10 caractères'
        }
      }

    },
    category: {
      type: DataTypes.ENUM(
        'Matériel',
        'Logiciel', 
        'Réseau',
        'Accès et comptes',
        'Courriel',
        'Impression',
        'Sécurité',
        'Téléphonie',
        'Autre'
      ),
      allowNull : true
    },
    priority: {
      type: DataTypes.ENUM(
        'Basse', 
        'Moyenne', 
        'Haute', 
        'Critique'
      ),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'Ouvert', 
        'Assigné', 
        'En cours', 
        'En attente', 
        'Résolu', 
        'Fermé', 
        'Archivé'
      ),
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  },
  {
    tableName: 'tickets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

ticket.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator'
})

ticket.belongsTo(User, {
  foreignKey: 'assigned_to',
  as: 'technicien'
})

module.exports = ticket