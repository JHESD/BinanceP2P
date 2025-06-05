const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const adminRoutes = require('./admin.routes');
const currencyRoutes = require('./currency.routes');
const walletRoutes = require('./wallet.routes');
const transactionRoutes = require('./transaction.routes');
const advertisementRoutes = require('./advertisement.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/currencies', currencyRoutes);
router.use('/wallets', walletRoutes);
router.use('/transactions', transactionRoutes);
router.use('/advertisement', advertisementRoutes);

module.exports = router;
