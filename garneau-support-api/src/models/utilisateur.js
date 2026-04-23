const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const utilisateur = sequelize.define(
  'utilisateurs',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    courriel: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    mot_de_passe: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('client', 'technicien', 'admin'),
      allowNull: false
    },
    est_actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    date_creation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    date_modification: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  },
  {
    tableName: 'utilisateurs',
  }
);
module.exports = utilisateur;
