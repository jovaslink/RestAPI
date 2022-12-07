const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.middlewares();
        this.routes();
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
       this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }
   
    
    listen() {
        this.app.listen(this.PORT,()=>{
            console.log(`SERVIDOR JAM ESCUCHANDO EN PUERTO ${this.PORT}`);
        });
    }
}

module.exports= Server;