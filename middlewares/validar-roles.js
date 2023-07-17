const esAdminRole = (req, res = response, next )=>{
  if(!req.usuarioIdentificado){
    return res.status(500).json({
      msg: "se quiere verificar el Role sin validar el token primero"
    })
  }

  const {rol, nombre} = req.usuarioIdentificado;

  if (rol !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg:`${nombre} no es un administrador`
    })
  }


next();
}

//este middleware es una función que recibe muchos parametros, para useo se retorna una funcon
// que tenga la estructura del middelware, con la funcion next
const tieneRol = ( ...roles ) => {
  return (req, res = response, next) => {

    console.log(roles , req.usuarioIdentificado.rol);

    if(!req.usuarioIdentificado){
      return res.status(500).json({
        msg: "se quiere verificar el Role sin validar el token primero"
      })
    };

    if(!roles.includes(req.usuarioIdentificado.rol)){
      return res.status(401).json({
        msg : `El servicio requiere uno de estos roles ${roles}`
      })
    }

    next();
  }
}

module.exports = {esAdminRole , tieneRol}
