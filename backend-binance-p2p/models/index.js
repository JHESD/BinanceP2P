const sequelize = require('../config/database');

const User = require('./user.models');
const Wallet = require('./wallet.models');
const Transaction = require('./transaction.models');
const Currency = require('./currency.models');
const Ad = require('./advertisement.models');

User.hasMany(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId' });

Currency.hasMany(Wallet, { foreignKey: 'currencyId' });
Wallet.belongsTo(Currency, { foreignKey: 'currencyId' });


Wallet.hasMany(Transaction, { foreignKey: 'walletFromId', as: 'sentTransactions' });
Wallet.hasMany(Transaction, { foreignKey: 'walletToId', as: 'receivedTransactions' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletFromId', as: 'fromWallet' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletToId', as: 'toWallet' });

User.hasMany(Ad, { foreignKey: 'userId' });
Ad.belongsTo(User, { foreignKey: 'userId' });


Ad.belongsTo(Wallet, { foreignKey: 'walletId', as: 'wallet' });
Wallet.hasMany(Ad, { foreignKey: 'walletId', as: 'ads' });

Currency.hasMany(Ad, { foreignKey: 'currencyId' });
Ad.belongsTo(Currency, { foreignKey: 'currencyId' });

Ad.hasMany(Transaction, { foreignKey: 'adId' });
Transaction.belongsTo(Ad, { foreignKey: 'adId' });

module.exports = {
    sequelize,
    User,
    Wallet,
    Transaction,
    Currency,
    Ad,
};