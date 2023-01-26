const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT= async (req =request, res =response, next)=>{
    const token = req.header('jam-token');
    
    if(!token){
        return res.status(401).json( { msg:'No existe el token en la petición'} );
    }

    try { 
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY);
        const usuarioAuth= await Usuario.findById(uid);

        if(!usuarioAuth){
            return res.status(401).json( { msg:'Token no válido -Usuario no existe en DB'} );

        }

        if(!usuarioAuth.estado){
            return res.status(401).json( { msg:'Token no válido -Usuario estado:false'} );

        }
        
        req.usuarioAuth=usuarioAuth;
        next();

    }catch(err) {

        console.log(err);
        return res.status(401).json({msg:'Token no válido'});

    }
  

}

module.exports={

    validarJWT
}