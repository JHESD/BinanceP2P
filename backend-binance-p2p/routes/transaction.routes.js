const express = require('express');
const router = express.Router();
const {
    createPurchaseTransaction,
    uploadReceipt,
    finalizeTransaction,
    cancelTransaction,
    transferBetweenWallets,
    createSellTransaction
} = require('../controllers/transaction.controllers');
const {authenticateToken} = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/comprar', authenticateToken, createPurchaseTransaction);
router.post('/comprobante/:transactionId', authenticateToken, upload.single('receiptImage'), uploadReceipt);
router.put('/finalizar/:transactionId', authenticateToken, finalizeTransaction);
router.put('/cancelar/:transactionId', authenticateToken, cancelTransaction);

router.post('/transferir', authenticateToken, transferBetweenWallets);

router.post('/vender', authenticateToken, createSellTransaction);

module.exports = router;