const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/configDB');

class Server {

    constructor() {

        this.rutas = {
            usuariosPath: '/api/usuarios',
            authPath: '/api/auth'
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
        this.app.use(this.rutas.usuariosPath, require('../routes/usuarios.route'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        });
    };
}

module.exports = Server;