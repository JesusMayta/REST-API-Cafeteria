const express = require('express');
const { check } = require('express-validator');

const { loginUser, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares');

const router = express.Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginUser);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;