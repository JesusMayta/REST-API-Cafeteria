const express = require('express');
const { check } = require('express-validator');
const { listarCategorias, detalleCategoria, guardarCategoria, editarCategoria, eliminarCategoria } = require('../controllers/categorias.controller');
const { validarJWT, esAdminRole, validarCampos } = require('../middlewares');
const { existeCategoriaPorId, existeCategoriaPorNombre } = require('../helpers/dbValidators');

const router = express.Router();

router.get('/listar', listarCategorias);

router.get('/detalle/:id', [
    check('id', 'El id de Mongo no es válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], detalleCategoria);

router.post('/guardar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], guardarCategoria);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaPorNombre),
    validarCampos
], editarCategoria);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], eliminarCategoria);

module.exports = router;