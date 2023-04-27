const RolModel = require("../models/rol.model");
const UsuarioModel = require("../models/usuario.model");


const esRolValido = async (rol = '') => {
    const existeRol = await RolModel.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

const emailExiste = async (correo = '') => {
    const existeEmail = await UsuarioModel.findOne({ correo });
    if (existeEmail) {
        throw new Error('El correo ya está registrado');
    };
};

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await UsuarioModel.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    };
};

module.exports = {
    emailExiste,
    esRolValido,
    existeUsuarioPorId
}