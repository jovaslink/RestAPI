const {Router} = require('express');
const { check } = require('express-validator');
const { authLogin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();
    
    router.post('/',
    
    [
        check('correo','El correo no es válido').isEmail(),
        check('password','El password no es válido').not().isEmpty(),
        check('password','El password no es válido').isLength({min:6}),
        validarCampos
    ], authLogin
    
    );

module.exports= router;