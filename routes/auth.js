const {Router} = require('express');
const {check} = require('express-validator');
const {login,googleSingIn} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
  check('correo','el correo es obligatorio').isEmail(),
  check('password','La contraseña es obligatorioa').not().isEmpty(),
  validarCampos
], login);

router.post('/google',[
  check('id_token','el token es necesarioa').not().isEmpty(),
   validarCampos
], googleSingIn);




module.exports = router;