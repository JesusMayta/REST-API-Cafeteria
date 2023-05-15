const express = require('express');
const { check } = require('express-validator');

const { listarUsuarios, editarUsuario, guardarUsuario, eliminarUsuario, detalleUsuario } = require('../controllers/usuarios.controller');
const { validarCampos, validarJWT, esAdminRole, tieneRol } = require('../middlewares');
const { emailExiste, esRolValido, existeUsuarioPorId } = require('../helpers');

const router = express.Router();

router.get('/listar', listarUsuarios);

router.get('/detalle/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], detalleUsuario);

router.post('/guardar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], guardarUsuario);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], editarUsuario);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], eliminarUsuario);

module.exports = router;