const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Currency = sequelize.define('Currency', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valueInSus: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
});

module.exports = Currency;
