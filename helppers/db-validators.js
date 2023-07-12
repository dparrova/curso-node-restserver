const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol='')=> {
const existeRol = await Role.findOne({rol});
if(!existeRol){
  throw new Error(`El rol ${rol} no está registrado en la base de datos`)
}
}

const existeEmail = async (correo ='')=>{
const existe  = await Usuario.findOne({correo});
if(existe){
  throw new Error(`el correo: ${correo} ya está resgistrado`)
 // return res.status(400).json({msg:'Ese correo ya está registrado'})
}}

const existeUsuarioPorId = async (id )=>{
  const existe  = await Usuario.findById(id);
  if(!existe){
    throw new Error(`el id: ${id} no existe`)
   // return res.status(400).json({msg:'Ese correo ya está registrado'})
  }}

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId
}