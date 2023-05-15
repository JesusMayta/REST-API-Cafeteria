const express = require('express');
require('colors');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/configDB');


class Server {

    constructor() {

        //Rutas de los Endpoints
        this.rutas = {
            authPath: '/api/auth',
            busquedasPath: '/api/buscar',
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos',
            uploadsPath: '/api/uploads',
            usuariosPath: '/api/usuarios',
        };

        this.app = express();
        this.port = process.env.PORT;

        //conectar a BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    };

    async conectarDB() {
        await dbConnection();
    };

    middlewares() {

        //CORS 
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('src/public'));

        //Fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    };

    routes() {
        this.app.use(this.rutas.authPath, require('../routes/auth.route'));
        this.app.use(this.rutas.busquedasPath, require('../routes/busquedas.route'));
        this.app.use(this.rutas.categoriasPath, require('../routes/categorias.route'));
        this.app.use(this.rutas.productosPath, require('../routes/productos.route'));
        this.app.use(this.rutas.uploadsPath, require('../routes/uploads.route'));
        this.app.use(this.rutas.usuariosPath, require('../routes/usuarios.route'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log((''));
            console.log(`Servidor corriendo en el puerto: ${this.port}`.yellow)
        });
    };
}

module.exports = Server;