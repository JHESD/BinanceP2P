const Wallet = require('../models/wallet.models');
const Currency = require('../models/currency.models');
const Transaction = require('../models/transaction.models');

const getUserWallets = async (req, res) => {
    try {
        const userId = req.user.userId;
        const wallets = await Wallet.findAll({
        where: { userId },
        include: [{ model: Currency }]
        });

        res.json(wallets);
    } catch (error) {
        console.error('Error al obtener wallets:', error);
        res.status(500).json({ message: 'Error al obtener wallets' });
    }
};

const getWalletHistory = async (req, res) => {
    const { walletId } = req.params;

    try {
    const wallet = await Wallet.findOne({
        where: {
        id: walletId,
        userId: req.user.userId
        }
    });

    if (!wallet) {
        return res.status(404).json({ message: 'Wallet no encontrada o no autorizada' });
    }

    const sent = await Transaction.findAll({
        where: { walletFromId: walletId },
        include: [{ model: Wallet, as: 'toWallet' }]
    });

    const received = await Transaction.findAll({
        where: { walletToId: walletId },
        include: [{ model: Wallet, as: 'fromWallet' }]
    });

    res.status(200).json({ sent, received });
    } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ message: 'Error al obtener historial' });
    }
};

const createWallet = async (req, res) => {
    const userId = req.user.userId;
    const { currencyId, balance } = req.body;

    try {
        const currency = await Currency.findByPk(currencyId);
        if (!currency) {
        return res.status(404).json({ message: 'Moneda no encontrada' });
        }

        const existingWallet = await Wallet.findOne({
        where: {
            userId,
            currencyId
        }
        });

        if (existingWallet) {
            return res.status(400).json({ message: 'Ya tienes una wallet con esta moneda' });
        }

        const newWallet = await Wallet.create({
        userId,
        currencyId,
        balance: balance || 0
        });

        res.status(201).json({ message: 'Wallet creada', wallet: newWallet });
    } catch (error) {
        console.error('Error al crear wallet:', error);
        res.status(500).json({ message: 'Error al crear wallet' });
    }
};

module.exports = {
    getUserWallets,
    getWalletHistory,
    createWallet
};