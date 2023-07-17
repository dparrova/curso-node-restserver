const jwt = require('jsonwebtoken');

const validarjwt = async (req = request,res = response, next) =>{

const Usuario = require('../models/usuario');

const token = req.header('x-token');

if(!token){
 return res.status(401).json({
  msg: "no hay token en la peticion"
 })
}

try {
  const {uid} = jwt.verify(token, process.env.SECRETORPUBLICKEY);
  const usuario = await Usuario.findById(uid);
  req.usuarioIdentificado = usuario;
  //verificarl si el uid está true

  if(!usuario){
    return res.status(401).json({
      msg: "Usuario no existe en la DB"
    })
  }

  if(!usuario.estado){
    return res.status(401).json({
      msg: "Usuario con estado en false"
    })
  }

  next();
} catch (error) {
  console.log(error);
  return res.status(401).json({
    msg: 'Token no valido'
  })
}

}

module.exports={
  validarjwt
}