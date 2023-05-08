const { request, response } = require('express');
const { Producto } = require('../models')


const listarProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const estado = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(estado),
        Producto.find(estado)
            .populate('usuario', ['nombre', 'rol'])
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    })
};

const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const productoBuscado = await Producto.findById(id)
        .populate('usuario', ['nombre', 'rol'])
        .populate('categoria', 'nombre');

    res.json(productoBuscado);

};

const crearProducto = async (req = request, res = response) => {

    const { nombre, precio, categoria, descripcion } = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
        precio,
        categoria,
        descripcion
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);

};

const editarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
        console.log(data.nombre)
    };

    data.usuario = req.usuario._id;

    const productoEditado = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(productoEditado)

};

const eliminarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoEliminado);

};

module.exports = {
    crearProducto,
    editarProducto,
    eliminarProducto,
    listarProductos,
    obtenerProducto
}