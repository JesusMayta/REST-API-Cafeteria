const { request, response } = require("express");
const { Categoria } = require("../models");


const listarCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const estado = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(estado),
        Categoria.find(estado)
            .populate({ path: 'usuario', select: ['nombre', 'rol'] })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({ total, categorias });
};

const detalleCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', ['nombre', 'rol']);

    res.json(categoria);
};

const guardarCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    };

    //Generar la data y guardar
    const categoria = new Categoria({ nombre, usuario: req.usuario._id });
    await categoria.save();

    res.status(201).json(categoria);
};

const editarCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoriaEditada);
};

const eliminarCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const eliminado = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(eliminado);
};

module.exports = {
    editarCategoria,
    eliminarCategoria,
    detalleCategoria,
    guardarCategoria,
    listarCategorias
}