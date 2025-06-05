const express = require('express');
const router = express.Router();
const { getAllUsers, changeUserRole } = require('../controllers/admin.controllers');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/user', authenticateToken, isAdmin, getAllUsers); // solo admins
router.put('/user/:id/role', authenticateToken, isAdmin, changeUserRole); // cambiar rol

module.exports = router;