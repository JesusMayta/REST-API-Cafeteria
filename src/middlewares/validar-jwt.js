const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');

const validarJWT = (req = request, res = response, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    jwt.verify(token, process.env.SECRETORPRIVATEKEY, async (err, result) => {
        if (err) {
            return res.status(401).json({ msg: 'El token no es válido' })
        } else {
            const user = await UsuarioModel.findById(result.userId);

            //Verificar si el usuario existe en DB
            if (!user) {
                return res.status(401).json({
                    msg: 'Token no válido - Usuario no existe en DB'
                });
            };

            //Verificar si el usuario tiene estado true
            if (!user.estado) {
                return res.status(401).json({
                    msg: 'Token no válido - Usuario con estado false'
                });
            };

            req.usuario = user;
            next();
        }
    });

};

module.exports = {
    validarJWT
}