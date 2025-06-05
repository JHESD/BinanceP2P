const express = require('express');
const router = express.Router();
const { createAd, getAdsByCurrencyAndType, getAdById, updateAdStatus } = require('../controllers/advertisement.controllers');
const upload = require('../middlewares/upload.middleware');
const {authenticateToken } = require('../middlewares/auth.middleware'); // ← esto faltaba

router.post('/', authenticateToken, upload.single('paymentImage'), createAd);

router.get('/', getAdsByCurrencyAndType);
router.get('/:id', getAdById);
router.patch('/:id/status', updateAdStatus);

module.exports = router;
