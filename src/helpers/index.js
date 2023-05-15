const catalogarArchivos = require('../helpers/catalogar-archivo');
const dbValidators = require('../helpers/dbValidators');
const generarJwt = require('../helpers/generar-jwt');
const googleVerify = require('../helpers/google-verify');
const subirArchivos = require('../helpers/subir-archivo');

module.exports = {
    ...catalogarArchivos,
    ...dbValidators,
    ...generarJwt,
    ...googleVerify,
    ...subirArchivos
}