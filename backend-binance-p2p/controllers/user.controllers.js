const { User } = require('../models');
const bcrypt = require('bcrypt');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
        attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const { name, email, password } = req.body;
        if (password) {
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
        }
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.json({ message: 'Perfil actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil', error });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar usuarios', error });
    }
};

const grantAdmin = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        user.isAdmin = true;
        await user.save();

        res.json({ message: 'Permisos de administrador otorgados' });
    } catch (error) {
        res.status(500).json({ message: 'Error al otorgar permisos', error });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    listUsers,
    grantAdmin
};
