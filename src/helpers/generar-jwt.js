const jwt = require('jsonwebtoken');

const generarJWT = (userId) => {

    return new Promise((resolve, reject) => {

        const payload = { userId };

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: '8h' }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            });
    });
};

module.exports = {
    generarJWT
}