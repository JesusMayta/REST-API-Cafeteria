const express = require('express');
const { listarUsuarios, editarUsuario } = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/listar', listarUsuarios);

router.put('/editar/:id', editarUsuario)

module.exports = router;