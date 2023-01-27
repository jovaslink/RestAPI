<?php
ini_set('display_errors', 1);
ini_set('xdebug.var_display_max_depth', 55);
ini_set('xdebug.var_display_max_children', 512);
ini_set('xdebug.var_display_max_data', 2048);

function obtenerCatalogo()
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

?>