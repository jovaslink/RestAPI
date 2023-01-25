const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT= (req =request, res =response, next)=>{
    const token = req.header('jam-token');
    
    if(!token){
        return res.status(401).json( { msg:'No existe el token en la petición'} );
    }

    try { 
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY);
        req.uid=uid;
        next();

    }catch(err) {

        console.log(err);
        return res.status(401).json({msg:'Token no válido'});

    }
  

}

module.exports={

    validarJWT
}