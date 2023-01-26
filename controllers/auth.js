const {response,request}=require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { default: axios } = require('axios');

const authLogin = async (req = request, res = response)=>{
    const {correo,password} = req.body;
        
   try {

    //verificar que el correo exista
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
        return res.status(400).json({
            msg:'Usuario o contraseña incorrectos -correo'
         });

    }
    // verificar que el usuario este activo
    if(!usuario.estado){
        return res.status(400).json({
            msg:'Usuario o contraseña incorrectos -estado'
         });

    }

    //verificar contraseña
    const passValido= bcryptjs.compareSync(password,usuario.password);

    if(!passValido){
        return res.status(400).json({
            msg:'Usuario o contraseña incorrectos -password'
        });
     }
    
    // asignar JWT
    const token = await generarJWT(usuario.id);

    //PROVISIONAL AXIOS CONEXIÓN CON BRIDGE 

    const respuesta = await axios.post('http://localhost/bridge/bridge.php',{
        name: 'HOLA DESDE JAM REST API NODE'
      });
      const proveedor= respuesta.data;

     //PROVISIONAL AXIOS CONEXIÓN CON BRIDGE 


    res.json({
        usuario,
        token,
        proveedor
        
     });

   } 
   
   catch(error) {
    console.log(error);
    res.status(500).json({
        msg:'Contacte con el administrador: jovaslink@gmail.com'
     });

   }
   
   
   
}

module.exports=
{
    authLogin
}