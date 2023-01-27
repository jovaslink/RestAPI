const { request, response } = require("express");
const { default: axios } = require("axios");


const catalogos = async (req=request,res=response)=>{

    const proveedor = req.body.proveedor;

    if(proveedor==="prontipagos") {
        try {
        //AXIOS CONEXIÓN CON BRIDGE 
        const respuesta = await axios.post('http://localhost/bridge/bridge.php',
                            {
                                proveedor
                            });
         const {msg} = respuesta.data;    
         console.log(msg);               
        return res.status(200).
               json({
                        msg
                    });
        
        } catch(err){
            console.log(err);
            return res.status(401).
                    json({
                            msg:"Error al obtener el catálogo"
                        });
        }
    }

    return res.status(400).
           json({
                    msg:`No existe el catálogo ${proveedor} `
                });
}

module.exports={
    catalogos
}