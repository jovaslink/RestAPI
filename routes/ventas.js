const {Router} = require('express');
const { check } = require('express-validator');
const { ventas } = require('../controllers/ventas');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();
    
    router.post('/',
    
        [
            check('referencia','El número o la referencia no son válidas').not().isEmpty().isNumeric(),
            check('sku','El SKU no es válido').not().isEmpty(),
            check('monto','El monto no es válido').not().isEmpty().isNumeric(),
            validarCampos
        ], ventas
    
    );

module.exports= router;