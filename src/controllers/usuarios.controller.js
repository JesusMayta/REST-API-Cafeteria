const { request, response } = require('express');

const listarUsuarios = (req, res = response) => {
    res.json({
        msg: 'Lista de usuarios'
    });
};

const editarUsuario = (req = request, res = response) => {

    const { id } = req.params;
    const { valor } = req.query;

    res.json({
        msg: 'PUT user',
        id,
        valor
    });

};

module.exports = {
    editarUsuario,
    listarUsuarios,
}