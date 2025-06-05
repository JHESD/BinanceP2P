const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Ya existe un usuario con ese correo' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
        username,
        email,
        password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error); // <-- Añade esto
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (user.isAdmin) {
            return res.status(403).json({ message: 'Debes iniciar sesión desde la ruta de administrador' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (!user.isAdmin) return res.status(403).json({ message: 'Acceso denegado: no es administrador' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, message: 'Inicio de sesión de administrador exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión de administrador', error });
    }
};


module.exports = {
    register,
    login,
    adminLogin
};
