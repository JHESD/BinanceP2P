const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');
const { getUserWallets, getWalletHistory, createWallet} = require('../controllers/wallet.controllers');

router.post('/', authenticateToken, createWallet);
router.get('/', authenticateToken, getUserWallets);
router.get('/:walletId/history', authenticateToken, getWalletHistory);

module.exports = router;
