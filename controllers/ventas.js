const { default: axios } = require("axios");
const { request, response } = require("express")


const ventas= async (req=request, res=response)=>{

   try {
   
    const {referencia,sku,monto,uid}=req.body

    //AXIOS CONEXIÓN CON BRIDGE 
    

    const respuesta = await axios.post('http://localhost/bridge/bridge.php',
                            {
                                referencia,
                                sku,
                                monto,
                                uid
                            });

    const  {
            msg,
            referenciaB,
            skuB,
            montoB,
            uidB} = respuesta.data;

    console.log(msg);
    /*
        {
            return: {
                codeTransaction: '00',
                codeDescription: 'Transaccion exitosa',
                dateTransaction: '27/01/2023 00:23:42',
                transactionId: '128475',
                folioTransaction: '727120'
            }
        }
    
    */

    return res.status(200).json({
        referenciaB,
        skuB,
        montoB,
        uidB
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