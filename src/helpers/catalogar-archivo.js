
const catalogarArchivo = (nombreArchivo = '') => {

    const nombreCortado = nombreArchivo.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    switch (extension) {
        case 'jpg': case 'jpeg': case 'png':
            return { tipo: 'img', extension };
            break;
        case 'pdf': case 'txt':
            return { tipo: 'doc', extension };
            break;
    };
};

module.exports = {
    catalogarArchivo
}