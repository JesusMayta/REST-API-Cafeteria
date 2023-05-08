const { Categoria, Rol, Usuario, Producto } = require('../models');

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('El correo ya está registrado');
    };
};

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    };
};

const existeCategoriaPorNombre = async (nombre = '') => {

    const existeNombreCategoria = await Categoria.findOne({ nombre: nombre.toUpperCase() });
    if (existeNombreCategoria) {
        throw new Error(`La categoria ${existeNombreCategoria.nombre} ya existe`);
    };
};

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error('El id no existe ne la Base de datos');
    };
};

const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error('El id no existe ne la Base de datos');
    };
};

const existeProductoPorNombre = async (nombre = '') => {
    const producto = await Producto.findOne({ nombre: nombre.toUpperCase() });
    if (producto) {
        throw new Error(`El producto ${nombre} ya existe en la base de datos`)
    }
};

module.exports = {
    emailExiste,
    esRolValido,
    existeCategoriaPorId,
    existeCategoriaPorNombre,
    existeProductoPorId,
    existeProductoPorNombre,
    existeUsuarioPorId
}