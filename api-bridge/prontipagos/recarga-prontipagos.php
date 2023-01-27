<?php
ini_set('display_errors', 1);
ini_set('xdebug.var_display_max_depth', 55);
ini_set('xdebug.var_display_max_children', 512);
ini_set('xdebug.var_display_max_data', 2048);
function sellServiceProntipagos($amount,$reference,$sku,$clientReference)
	{
		$client = new SoapClient("http://wsapp.prontipagos.mx/siveta-endpoint-ws-1.0-SNAPSHOT/ProntipagosTopUpServiceEndPoint?wsdl", 
					  array('login'=>"administracion@jamcomunicaciones.com.mx",
		                    'password'=>"Flordeloto4523!"));// conexion al WS

		$param = array(     		'amount' => $amount,
									'reference' => $reference,
									'sku'=> $sku,
									'clientReference' => $clientReference
		                );
		//logs("DATOS ENVIADOS A sellService");
		//$log=var_export($param, true); 
        //logs($log);

		$ready = $client->sellService($param);

		//logs("DATOS RECIBIDOS DE sellService");		
		//$log=var_export($ready, true); 
        //logs($log); 
		//$xml_r = simplexml_load_string($ready->return);
        return $ready;
	}


function checkStatusService($clientReference)
	{
		$client = new SoapClient("http://wsapp.prontipagos.mx/siveta-endpoint-ws-1.0-SNAPSHOT/ProntipagosTopUpServiceEndPoint?wsdl", 
					  array('login'=>"administracion@jamcomunicaciones.com.mx",
		                    'password'=>"Flordeloto4523!")); // conexion al WS

		$numero=1;
		$param = array(     										
									'transactionId' => $clientReference,
									'clientReference'=>$numero 
		                				
		                );
		//logs("DATOS ENVIADOS A checkStatusService");
		//$log=var_export($param, true); 
        //logs($log);

		$ready = $client->checkStatusService($param);
		
		//logs("DATOS RECIBIDOS DE checkStatusService");
		//$log=var_export($ready, true); 
        //logs($log);

		//var_dump($ready);
		//$xml_r = simplexml_load_string($ready->return);
        return $ready;
	}

function obtainCatalogProducts()
	{
		
		$client = new SoapClient("http://wsapp.prontipagos.mx/siveta-endpoint-ws-1.0-SNAPSHOT/ProntipagosTopUpServiceEndPoint?wsdl", 
					  array('login'=>"administracion@jamcomunicaciones.com.mx",
		                    'password'=>"Flordeloto4523!"));


		$ready = $client->obtainCatalogProducts();
		//var_dump($ready);
		//$xml_r = simplexml_load_string($ready->return);
        return $ready;
		/*
        $url = "https://ws.prontipagos.mx/siveta-endpoint-ws-1.0-SNAPSHOT/ProntipagosTopUpServiceEndPoint?wsdl";
        $options['login'] = 'administracion@jamcomunicaciones.com.mx';
		$options['password'] ='Jam180510!';
		$options["location"] = $url;
		$options['trace'] = 1;
		$client = new SoapClient($url,$options);
		$ready = $client->obtainCatalogProducts();
        return $ready;
		*/




	}

//checkStatusService(1234567897);
//$x=obtainCatalogProducts();
//$x=$recarga["codigo"];
//$x=$recarga["autorizacion"];
//echo("YES:");
//var_dump($x);
?>