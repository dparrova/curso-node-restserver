const {response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJwt } = require('../helppers/generar-jwt');

const login = async (req, res = response) => {

  const {correo,password} = req.body;

  try {
    //verificar si correo existe
      const usuario = await Usuario.findOne({correo});
      if(!usuario){
        return res.status(400).json({
          msg:"Usuario / contraseña incorretos -- correo"
        })
      }

    //verificar si ussuario activo
    if(!usuario.estado){
      return res.status(400).json({
        msg:"Usuario / contraseña incorretos -- estado false"
      })
    }
    // verificar contraseña
    const validPasswor = bcryptjs.compareSync(password, usuario.password)
    if(!validPasswor){
      return res.status(400).json({
        msg:"Usuario / contraseña incorretos -- contraseña"
      })
    }
    //generar JWT
    const token = await generarJwt(usuario.id);

    res.json({
      msg : 'login ok',
      usuario,
      token
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg:"hable con el administrador"
    })
  }

}

module.exports = login;