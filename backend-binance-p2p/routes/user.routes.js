const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');
const {
  getUserProfile,
  updateUserProfile,
  listUsers,
  grantAdmin
} = require('../controllers/user.controllers');

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.get('/', authenticateToken, isAdmin, listUsers);
router.put('/:id/grant-admin', authenticateToken, isAdmin, grantAdmin);

module.exports = router;