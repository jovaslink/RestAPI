<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 36000");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'prontipagos/validacion-prontipagos.php';
include_once 'prontipagos/obtener-catalogo.php';

//$xml_r = validacionProntipagos(20,5573898468,NULL,1986161986);

 //var_dump($xml_r);  



$data = json_decode(file_get_contents("php://input"));



    if(!empty($data->referencia) && !empty($data->sku) &&
        !empty($data->monto)){

        $monto = intval($data->monto);
        $referencia = intval($data->referencia);
        $id= intval($data->uid);
        $xml_r = validacionProntipagos($monto,$referencia,NULL,$id);
   
    /* if(true){

        $monto = 20;
        $referencia = 5573898468;
        $id= 364859;

        
        $xml_r = validacionProntipagos($monto,$referencia,NULL,$id);
        if (isset($xml_r->return->codeTransaction)) {
			$codeTransaction=$xml_r->return->codeTransaction;
            echo json_encode(
                array(  
                        "msg"=>$codeTransaction,
                        "montoB"=>$monto,
                        "referenciaB"=>$referencia,
                        "uidB"=>"YES BABY"

                    ));

		} */
        echo json_encode(
                    array(  
                            "msg"=>$xml_r,
                            "montoB"=>$monto,
                            "referenciaB"=>$referencia,
                            "uidB"=>$id

                        ));
        return;

    }

    if(!empty($data->proveedor)){
        //$xml_r=$data->proveedor;
        $xml_r = obtenerCatalogo();
        echo json_encode(
            array(  
                    "msg"=>$xml_r,
                ));
        return;
    }


    http_response_code(400); 
    echo json_encode(array("msg" => "DATOS INCOMPLETOS"));

?>