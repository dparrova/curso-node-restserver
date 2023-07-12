const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const usuariosGet =  async (req = request,res = response) =>{

 // const {q,nombre = 'No name',apikey,page=1,limit=10} = req.query;

 // get de todos los usuarios

  const estado = {estado:true}
 const {limite=5, desde = 0} = req.query;

//usar promise.all para enviar las dos peticiones que antes eran
//un await, funciones bloqueantes, ahora se envian al tiempo y se resuelve
//en menos tiempo. Se hace desetructuración de objeto []
 const [total, usuarios] = await Promise.all([
 Usuario.countDocuments(estado),
 Usuario.find(estado)
 .skip( Number(desde))
 .limit( Number(limite))
]);

  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async (req,res = response) =>{

  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});
  //verificar si el correo existe

  //encriptar base de datos
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //guardar en base de datos
  await usuario.save();
  res.json({
   usuario
  })
}



const usuariosPut = async (req,res = response) =>{
  const id = req.params.id;
  const { _id, password, google, correo, ...resto} = req.body;
//todo validar contra base de datos
if (password) {
  const salt = bcryptjs.genSaltSync();
  resto.password = bcryptjs.hashSync(password, salt);
}

const usuario = await Usuario.findByIdAndUpdate(id,resto);

  res.json(usuario)
}
const usuariosPatch = (req,res = response) =>{
  res,
  res.json({
    msj: 'patch API - Controlador'
  })
}

const usuariosDelete = async (req,res = response) =>{
  const id = req.params.id;
  // esto elimina el registro completamente
  //const usarioEliminado = await Usuario.findByIdAndDelete(id);

  //mejor si se cambia es el stado
  const usuarioEliminado = await Usuario.findByIdAndUpdate(id,{estado:false});

  res,
  res.json(
    usuarioEliminado
  )
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}