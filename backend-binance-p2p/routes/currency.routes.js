const express = require('express');
const router = express.Router();
const { createCurrency, getAllCurrencies, updateCurrency, deleteCurrency, convertCurrency,} = require('../controllers/currency.controllers');

const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', authenticateToken, isAdmin, createCurrency);
router.put('/:id', authenticateToken, isAdmin, updateCurrency);
router.delete('/:id', authenticateToken, isAdmin, deleteCurrency);

router.get('/', authenticateToken, getAllCurrencies);
router.post('/convert', authenticateToken, convertCurrency);

module.exports = router;
