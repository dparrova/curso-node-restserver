const mongoose = require('mongoose');

const dbConection = async ()=>{
try {

  await mongoose.connect(process.env.MONGODBATLAS,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  });

  console.log('Conectado a la base de datos');

} catch (error) {
  console.log(error)
  throw new Error('Error al iniciar la base de datos')
}

}


module.exports = {
  dbConection
}