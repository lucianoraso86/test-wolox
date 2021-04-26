const configJWT = require('../config/config-jwt');
const JWT = require('jsonwebtoken');


// middleware para validar token (rutas protegidas)
const verifyToken = (req, res, next) => {

    const token = req.header('token');

    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verified = JWT.verify(token, configJWT.secret);
        req.user = verified.user;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token invalido' });
    }
}

module.exports = verifyToken;