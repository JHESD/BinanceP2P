const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wallet = sequelize.define('Wallet', {
    balance: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    }
});

module.exports = Wallet;
