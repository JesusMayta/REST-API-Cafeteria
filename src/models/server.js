const express = require('express');
require('colors');
const cors = require('cors');
const { dbConnection } = require('../database/configDB');

class Server {

    constructor() {

        this.rutas = {
            authPath: '/api/auth',
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos',
            usuariosPath: '/api/usuarios',
            busquedasPath: '/api/buscar'
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
        this.app.use(express.json({ limit: '20mb' }));

        // Directorio público
        this.app.use(express.static('src/public'));

    };

    routes() {
        this.app.use(this.rutas.authPath, require('../routes/auth.route'));
        this.app.use(this.rutas.busquedasPath, require('../routes/busquedas.route'));
        this.app.use(this.rutas.categoriasPath, require('../routes/categorias.route'));
        this.app.use(this.rutas.productosPath, require('../routes/productos.route'));
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