const express = require('express');
const cors = require('cors')



class Server{


  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usariosPath = '/api/usuarios'

    //middleware
    this.middlewares();

    //rutas de la aplicación
    this.routes();
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