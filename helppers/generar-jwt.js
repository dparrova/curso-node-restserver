const jwt = require('jsonwebtoken')

const generarJwt =  (uid='')=>{


  return new Promise ((resolve,reject)=>{

    const paylod = {uid};
    jwt.sign(paylod, process.env.SECRETORPUBLICKEY,{
      expiresIn:'4h'
    },(err,token)=>{
      if(err){
        console.log(err);
        reject('No se pudo generar el token')
      }else{
        resolve( token);
      }
    })

  })

}


module.exports = {generarJwt}