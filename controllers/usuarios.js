const { response } = require('express')

const usuariosGet = (req,res = response) =>{

  const {q,nombre = 'No name',apikey,page=1,limit=10} = req.query;

  res.json({
    msj: 'get API - Controlador',
    q,
    nombre,
    apikey,
    page,
    limit
  })
}

const usuariosPost = (req,res = response) =>{
  const {nombre,edad} = req.body;
  res.json({
    msj: 'post API - Controlador',
    nombre,
    edad
  })
}
const usuariosPut = (req,res = response) =>{
  const id = req.params.id;
  res.json({
    msj: 'put API - Controlador',
    id
  })
}
const usuariosPatch = (req,res = response) =>{
  res,
  res.json({
    msj: 'patch API - Controlador'
  })
}

const usuariosDelete = (req,res = response) =>{
  res,
  res.json({
    msj: 'delete API - Controlador'
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}