const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];

//Buscar usuarios
const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoId = isValidObjectId(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : [],
        });
    };

    const regex = new RegExp(termino, 'i');

    const query = {
        $or: [{ nombre: regex }, { correo: regex }], $and: [{ estado: true }]
    };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        results: {
            total,
            usuarios
        }
    });
};

//Buscar productos
const buscarProductos = async (termino = '', res = response) => {

    const esMongoId = isValidObjectId(termino);
    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : [],
        });
    };

    const regex = new RegExp(termino, 'i');

    const query = { nombre: regex, estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ]);

    res.json({
        results: {
            total,
            productos
        }
    });
};

//Buscar categorias
const buscarCategoria = async (termino = '', res = response) => {

    const esMongoId = isValidObjectId(termino);
    if (esMongoId) {
        const categoria = await Categoria.findById(termino).populate('usuario', ['nombre', 'rol']);
        return res.json({
            results: (categoria) ? [categoria] : [],
        });
    };

    const regex = new RegExp(termino, 'i');

    const query = { nombre: regex, estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ]);

    res.json({
        results: {
            total,
            categorias
        }
    });
};

const busquedas = async (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `No se encuentra la coleccion ${coleccion.toUpperCase()} en la lista: ${coleccionesPermitidas}`
        })
    };

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            });
    }


};

module.exports = {
    busquedas
}