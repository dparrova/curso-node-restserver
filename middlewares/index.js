const validarCampos = require('../middlewares/validar-campos');
const validarjwt = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');


module.exports = {
  ...validarCampos,
  ...validarjwt,
  ...validaRoles,  //utiliza el operador resto, para exportat todo lo que tenga esa constante
}