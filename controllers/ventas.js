const { default: axios } = require("axios");
const { request, response } = require("express")


const ventas= async (req=request, res=response)=>{

   try {
   
    const {referencia,sku,monto}=req.body

    //AXIOS CONEXIÓN CON BRIDGE 

    const respuesta = await axios.post('http://localhost/bridge/bridge.php',
                            {
                                referencia,
                                sku,
                                monto
                            });

    const  {referenciaB,skuB,montoB} = respuesta.data;

    
    return res.status(200).json({
            referenciaB,
            skuB,
            montoB
        });

   } catch (err){
        console.log(err);
        return res.status(401).json({
            msg:"Error en la venta -Comunicación con el Bridge"
        });
    }


}

module.exports={
    ventas
}