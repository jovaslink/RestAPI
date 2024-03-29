const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.dbConectar();
        this.usuariosPath = '/api/usuarios';
        this.authPath='/api/auth';
        this.ventasPath='/api/ventas';
        this.catalogosPath='/api/catalogos';
        this.middlewares();
        this.routes();
    }

    async dbConectar() {

        await dbConnection();
    
    }
    
    middlewares(){
        //CORS
        this.app.use(cors());
         //Lectura y parseo del Body
        this.app.use(express.json() );
        //Directorio publico
        this.app.use(express.static('public'));
       
    }
    
    routes(){
       this.app.use(this.usuariosPath,require('../routes/usuarios')),
       this.app.use(this.authPath,require('../routes/auth')),
       this.app.use(this.ventasPath,require('../routes/ventas')),
       this.app.use(this.catalogosPath,require('../routes/catalogos'))
    }
   
    
    listen() {
        this.app.listen(this.PORT,()=>{
            console.log(`SERVIDOR JAM ESCUCHANDO EN PUERTO ${this.PORT}`);
        });
    }
}

module.exports= Server;