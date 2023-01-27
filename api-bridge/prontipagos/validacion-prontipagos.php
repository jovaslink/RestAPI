<?php
ini_set('xdebug.var_display_max_depth', 55);
ini_set('xdebug.var_display_max_children', 512);
ini_set('xdebug.var_display_max_data', 2048);

include_once 'recarga-prontipagos.php';



function validacionProntipagos($amount,$reference,$sku,$clientReference){

		//$amount=20;
		//$reference=5530458062;
		//$sku=NULL;
		//$sku=NULL;
		//$clientReference=2015092138;
		$mensaje="inicio";
		$tiempo_inicio = microtime(true);
		$tiempo_fin=0;
		$tiempo_log=date("Y-m-d H:i:s");	
				   try 
                    {
                       //$sku=NULL;
                       //60 segundos
                       $socket=ini_set('default_socket_timeout',5);
                       $xml_r=sellServiceProntipagos($amount,$reference,$sku,$clientReference);
                       /*
                       var_dump($xml_r); 
                       echo "Invoca sellService EN TRY 1";
                       echo "<hr>";
						*/
                       if(!isset($xml_r->return->codeTransaction))
                       		{
                       			try 
		                          {	
									$mensaje="primer NO existe codeTransaction";
		                          	//60 segundos
			                        $socket=ini_set('default_socket_timeout',62);
		                          	$code="N/A";
		                          	$tiempo_inicio = microtime(true);
									$tiempo_fin=0;
									$contador=0;	
		                            while ($code=="N/A")
			                            {
				                        	sleep(2);	     
				                            $xml_r=checkStatusService($clientReference);
				                            $contador=$contador+1; 
				                    		if (isset($xml_r->return->codeTransaction))
				                    			{
				                    				$code=$xml_r->return->codeTransaction;    	 
						                        	
						                    		if (($tiempo_fin - $tiempo_inicio)>=60)
														{
															/*
															echo "ROMPIO WHILE ";
															echo "<hr>";
															*/
															break;
														} 
													$tiempo_fin = microtime(true);
													$mensaje="Existe CODE despues del if";	      
													
												}
											else 
												{
													//echo "NO ESTA DEFINIDA codeTransaction";
													$mensaje="NO existe codeTransaction despues del if";
													break;
												}	
												

			                        	}
			                        /*
			                        var_dump($xml_r);
				                    echo "SE INVOCA checkStatusService EN TRY 2";
                       				echo "<hr>";	
			                        echo "TIEMPO=".($tiempo_fin - $tiempo_inicio);
			                        echo "<hr>";
			                        echo $contador." veces se invoca checkStatusService EN TRY 2";	
									*/	                      
			                      }	
			                      catch (Exception $e)
		                          	{
			                            $tiempo_fin = microtime(true);
			                            $xml_r=$e;
			                            /*
			                            echo "TIEMPO=".($tiempo_fin - $tiempo_inicio);
			                            echo "<hr>";
			                            echo "EJECUTA CATCH 2";
                       					echo "<hr>";
			                            echo "ERROR POR TIMEOUT";
			                            var_dump($e);
			                            */  
										$mensaje="exepcion 1";
		                          	}
                       		}
                       	else 
                       			{
                       				$tiempo_fin = microtime(true);
                       				/*
                       				echo "<hr>";
			                        echo "TIEMPO=".($tiempo_fin - $tiempo_inicio);
        							*/  
									$mensaje= $xml_r->return->codeTransaction;             			
                       			}		
						     
		           
		            } 
		               		
											
                        
                 catch (Exception $e)
                    {
                       /*
                       echo "<hr>";
                       echo "EJECUTA CATCH 1";
                       echo "<hr>";
                       */
                       $tiempo_inicio = microtime(true);
					   $tiempo_fin=0;
                       try 
                          {
                             //60 segundos
			               $socket=ini_set('default_socket_timeout',62);
			               $code="N/A";
			               $contador=0;	
                            while ($code=="N/A")
	                            {
		                        	sleep(2);	     
		                            $xml_r=checkStatusService($clientReference); 
		                    		$contador=$contador+1;
		                    		if (isset($xml_r->return->codeTransaction))
		                    			{
		                    				$code=$xml_r->return->codeTransaction;
											$mensaje=$xml_r->return->codeTransaction;;    	 
				                        	
				                    		if (($tiempo_fin - $tiempo_inicio)>=60)
												{
													//echo "ROMPIO WHILE";
													break;
												} 
											$tiempo_fin = microtime(true);	      
											
										}
									else 
										{
											//echo "NO ESTA DEFINADA codeTransaction";
											$mensaje="NO codeTransaction else segundo TRY";
											break;
										}	

	                        	}
	                        /*	
	                        var_dump($xml_r);
	                        echo "<hr>";
		                    echo "SE INVOCA checkStatusService EN TRY 3";
                       		echo "<hr>";	
	                        echo "TIEMPO=".($tiempo_fin - $tiempo_inicio);
	                        echo "<hr>";
			                echo $contador." veces se invoca checkStatusService EN TRY 3";
			                */	
	                    } 
                      catch (Exception $e)
                          {
                          	  $tiempo_fin = microtime(true);
			                  $xml_r="ERROR POR TIMEOUT PRONTIPAGOS";
							 
							  return $xml_r;  
			                  /*
			                  echo "TIEMPO=".($tiempo_fin - $tiempo_inicio);
			                  echo "<hr>";	
	                          echo "EJECUTA CATCH 3";
                       		  echo "<hr>";
                              echo "ERROR POR TIMEOUT PRONTIPAGOS";
		                      var_dump($e);
		                      */  
                          
                          }                   
                  }
                //$a=socket_close($socket);

                
                return $xml_r;  
               }   

     
     //$xml_r=recargaProntipagos(20,1234567890,NULL,2015092148); 
     /*
     echo $code=$xml_r->return->codeTransaction;
     echo "<hr>";
     echo $code2=$xml_r->return->codeDescription;
     echo "<hr>";
     echo $code3=$xml_r->return->dateTransaction;
     echo "<hr>";
     echo $code4=$xml_r->return->transactionId;
     echo "<hr>";
     echo $code5=$xml_r->return->folioTransaction;
     echo "<hr>";
     echo $code6=$xml_r->return->additionalInfo;
     echo "<hr>";
     */
     //var_dump($xml_r);            
    	

?>





