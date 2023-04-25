const express = require('express');
const cors = require('cors');

class Server {

    constructor() {

        this.rutas = {
            usuariosPath: '/api/usuarios',
        };

        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
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
        this.app.use(this.rutas.usuariosPath, require('../routes/usuarios.route'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        });
    };
}

module.exports = Server;