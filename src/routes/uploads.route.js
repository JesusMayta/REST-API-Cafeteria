const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/:coleccion', [
    validarArchivoSubir,
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El ID debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

router.put('/cloudinary/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El ID debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);


router.get('/:coleccion/:id', [
    check('id', 'El ID debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

module.exports = router;