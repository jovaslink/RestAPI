const {Router} = require('express');
const { check } = require('express-validator');
const { catalogos } = require('../controllers/catalogos');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();
    
    router.post('/',
    
        [
            check('proveedor','El proveedor no es válido').not().isEmpty(),
            validarCampos
        ], catalogos
    
    );

module.exports= router;