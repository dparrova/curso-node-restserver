const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');



class Server{


  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usariosPath = '/api/usuarios'

//Conectar a db
    this.conectar();

    //middleware
    this.middlewares();

    //rutas de la aplicación
    this.routes();
  }

  async conectar(){
    await dbConection();
  }

  middlewares(){
    this.app.use( cors());
     //lectura y parseo del body
     this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static('public'))
  }

  routes(){
    this.app.use(this.usariosPath, require('../routes/user'))

  }
  listen(){

this.app.listen(this.port, ()=>{
  console.log(`Servidor en puerto ${this.port}`)
});
  }
}

module.exports = Server