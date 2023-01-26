const validarRoles  = require('../middlewares/validar-roles');
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validarCampos');


module.exports={
    ...validarRoles,
    ...validarJWT,
    ...validarCampos
}