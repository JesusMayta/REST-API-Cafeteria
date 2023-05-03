const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const UsuarioModel = require('../models/usuario.model');

const listarUsuarios = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        UsuarioModel.countDocuments(query),
        UsuarioModel.find(query)
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({
        total,
        usuarios
    })
};

const detalleUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const detalleUsuario = await UsuarioModel.findById(id);
    res.json(detalleUsuario);
};

const guardarUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new UsuarioModel({ nombre, correo, password, rol })

    //Encriptar la contraseña
    const numeroVueltas = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, numeroVueltas);

    // Guardar en DB
    await usuario.save();
    res.json(usuario);
};

const editarUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...usuario } = req.body;

    if (password) {
        //Encriptar la contraseña
        const numeroVueltas = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, numeroVueltas);
    };

    const usuarioEditado = await UsuarioModel.findByIdAndUpdate(id, usuario, { new: true });

    res.json(usuarioEditado);
};

const eliminarUsuario = async (req = request, res = response) => {
    const { id } = req.params;

    const usuarioEliminado = await UsuarioModel.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({ usuarioEliminado });
};

module.exports = {
    detalleUsuario,
    editarUsuario,
    eliminarUsuario,
    guardarUsuario,
    listarUsuarios,
}