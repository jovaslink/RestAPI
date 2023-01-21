const Role = require('../models/role');
const Usuario = require('../models/usuario');

const existeRol= async (role)=>{

    const existeRol= await Role.findOne({role});
    
    if (!existeRol){
        throw new Error(`El rol ${role} no está registrado en la BD`);
        
    }

}

//verificar que el correo no esté duplicado

const existeEmail= async (correo) => {
    
    const existeEmail= await Usuario.findOne({correo});
    
    if(existeEmail){
        throw new Error(`El correo ${correo} ya está registrado en la BD`);

    }
}

//verificar si el Id existe en la base de datos

const existeId= async (id) => {
    
    const existeId= await Usuario.findById(id);
    
    if(!existeId){
        throw new Error(`El Id ${id} no está registrado en la BD`);

    }
}


module.exports={
    existeRol, existeEmail, existeId
}