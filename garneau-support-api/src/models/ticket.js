const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

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
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
        'matériel',
        'Logiciel', 
        'Réseau',
        'Accès et compte',
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
        'En Cours', 
        'En Attente', 
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
module.exports = ticket