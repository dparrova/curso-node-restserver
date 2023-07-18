const {Schema , model} = require('mongoose');

const UsuarioSchema = Schema({
  nombre:{
    type: String,
    required: [true,'El nombre es obligatorio']
  },  correo:{
    type: String,
    required: [true,'El correo es obligatorio'],
    unique: true
  }, password:{
    type: String,
    required: [true,'La contraseña es obligatorio']
  }, img:{
    type: String,
  }, rol:{
    type: String,
    require: true,
    default: 'USER_ROLE',
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado:{
    type: Boolean,
    default: true
  },
  google:{
    type: Boolean,
    default: false
  }
})

//con esta forma se realiza la modificación el json para sacar info de ahi
//observe que se usa una funcion y se desestructura los elementos a sacar
UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuario} = this.toObject();
  usuario.uid=_id;
  return usuario;
}

module.exports = model('Usuario',UsuarioSchema );