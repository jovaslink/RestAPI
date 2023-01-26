const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { existeRol, existeEmail, existeId } = require('../helpers/validacionesBD');

const {
        validarAdminRole,
        validarVariosRoles,
        validarJWT,
        validarCampos
    } = require ('../middlewares');


const router = Router();
    
    router.get('/',
        [
            validarJWT,
            validarAdminRole
        ], 
        usuariosGet );
    
    router.post('/',
        [
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('correo','El correo no es válido').isEmail(),
            check('password','El password tiene que tener más de 6 caracteres').isLength({min:6}),
            //check('role','No es un ROL váldo').isIn(['ADMIN_ROLE','USER_ROLE']),
            check('correo').custom(existeEmail),
            check('role').custom(existeRol), //la función recibe el campo role, pero al recibir y retornar el mismo campo se puede simplificar solo con el nombr de la función
            validarCampos
        ],
        usuariosPost );
    
    router.put('/:idUser',
        [
            check('idUser', 'No es un Id válido').isMongoId(),
            check('idUser').custom(existeId),
            check('role').custom(existeRol), //la función recibe el campo role, pero al recibir y retornar el mismo campo se puede simplificar solo con el nombr de la función
            validarCampos
        ], 
        usuariosPut);
    
    router.delete('/:idUser',
        [ 
            validarJWT,
            //validarAdminRole,
            validarVariosRoles('EDITOR_ROLE','ADMIN_ROLE'),
            check('idUser', 'No es un Id válido').isMongoId(),
            check('idUser').custom(existeId),
            validarCampos
        ], 
        usuariosDelete);


module.exports= router;