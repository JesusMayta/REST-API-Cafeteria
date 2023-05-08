const { Router } = require('express');
const { listarProductos, crearProducto, obtenerProducto, editarProducto, eliminarProducto } = require('../controllers/productos.controller');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { check } = require('express-validator');
const { existeProductoPorId, existeCategoriaPorId, existeProductoPorNombre } = require('../helpers/dbValidators');

const router = Router();

router.get('/listar', listarProductos);

router.get('/detalle/:id', [
    check('id', 'El id de Mongo no es válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/guardar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeProductoPorNombre),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un Id de Mongo válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria', 'No es un Id de Mongo válido').isMongoId(),
    validarCampos
], editarProducto);

router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], eliminarProducto);

module.exports = router;