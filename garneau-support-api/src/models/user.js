const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const user = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: 'Le prénom doit contenir entre 2 et 50 caractères'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: 'Le nom doit contenir entre 2 et 50 caractères'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
          msg: 'le courriel doit être valide'
        },
        len: {
          args: [1, 50],
          msg: 'Le courriel ne doit pas dépasser 50 caractères'
        }
      }
    },

    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*\-_]).{6,}$/,
          msg: 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial.'
        }
      }
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false  
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        is: {
          args: /^(\+1[\s.-]?)?\(?[2-9][0-9]{2}\)?[\s.-]?[2-9][0-9]{2}[\s.-]?[0-9]{4}$/,
          msg: 'Le numéro de téléphone doit respecter le format canadien'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('client', 'technicien', 'admin'),
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
module.exports = user;
