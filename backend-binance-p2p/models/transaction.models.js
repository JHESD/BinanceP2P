const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.ENUM('compra', 'venta', 'transferencia'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pendiente', 'finalizada', 'cancelada'),
        defaultValue: 'pendiente',
    },
    description: {
        type: DataTypes.TEXT,
    },
    paymentImage: {
        type: DataTypes.STRING,
    },
    receiptImage: {
        type: DataTypes.STRING,
    },
    adId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Ads',
            key: 'id'
        }
    }
});

module.exports = Transaction;
