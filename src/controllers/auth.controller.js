const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const UsuarioModel = require("../models/usuario.model");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const loginUser = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await UsuarioModel.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario y/o contraseña es incorrecto - correo'
            });
        };

        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario no se encuentra registrado - estado : false'
            });
        };

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El usuario y/o contraseña es incorrecto - password'
            });
        };

        //Gnerar el jwt
        const token = await generarJWT(usuario._id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    };
};

const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        let usuario = await UsuarioModel.findOne({ correo });

        if (!usuario) {

            //Crear usuario
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            };

            usuario = new UsuarioModel(data);
            await usuario.save();

        };

        //Si el usuario db estado: false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado',
            });
        };

        // JWT
        const token = await generarJWT(usuario._id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es válido'
        })
    };
};

module.exports = {
    googleSignIn,
    loginUser
}