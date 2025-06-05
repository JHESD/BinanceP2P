const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ad = sequelize.define('Ad', {
  type: {
    type: DataTypes.ENUM('compra', 'venta'),
    allowNull: false,
  },
  pricePerUnit: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      min: 0.0001
    }
  },
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      min: 0.0001
    }
  },
  description: {
    type: DataTypes.TEXT,
  },
  paymentImage: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('activo', 'inactivo', 'completado', 'cancelado'),
    defaultValue: 'activo'
  },
  walletId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Wallets',
      key: 'id',
    }
  }
});

module.exports = Ad;
