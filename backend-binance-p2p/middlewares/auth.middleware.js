const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);

    if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token no válido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido o expirado' });

        console.log('Decoded user:', user);

        req.user = user;
        next();
    });
};


const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Acceso denegado: no eres administrador' });
    }
    next();
};

module.exports = {
    authenticateToken,
    isAdmin
};
