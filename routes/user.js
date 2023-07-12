const {Router} = require('express');
const {check} = require('express-validator');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helppers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet )
router.put('/:id',[
  check('id','No es un id valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  validarCampos
], usuariosPut)
router.post('/',[
  check('correo','el correo no es valido').isEmail().custom(existeEmail),
  check('nombre','el nombre es obligatorio').not().isEmpty(),
  check('password','El password es obligatorio debe de ser más de 6 letras').isLength({min:6}),
  //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom(esRolValido),
  validarCampos
], usuariosPost)
router.patch('/', usuariosPatch)
router.delete('/:id',[check('id','No es un id valido').isMongoId(),
check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete)



module.exports = router;