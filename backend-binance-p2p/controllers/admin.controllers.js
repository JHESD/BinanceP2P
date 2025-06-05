const User = require('../models/user.models');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'isAdmin', 'createdAt']
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

const changeUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { isAdmin } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        user.isAdmin = isAdmin;
        await user.save();

        res.status(200).json({ message: 'Rol actualizado correctamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar rol', error });
    }
};

module.exports = {
    getAllUsers,
    changeUserRole
};