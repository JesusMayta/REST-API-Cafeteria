const path = require('path');

const { v4: uuidv4 } = require('uuid');
const { catalogarArchivo } = require('./catalogar-archivo');

const subirArchivo = (files, carpeta = '', extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'txt', 'pdf']) => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const { tipo, extension } = catalogarArchivo(archivo.name);

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida: Solo -> ${extensionesValidas}`);
        };

        const nombreArchivo = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, tipo, nombreArchivo);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            };

            resolve(nombreArchivo);
        });

    });

    // 
};


module.exports = {
    subirArchivo
}