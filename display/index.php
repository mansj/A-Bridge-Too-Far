<!DOCTYPE html>
<html>
	<head>
		<title>OSC!</title>
		
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		
		
		<script src="js/jquery-2.1.1.min.js"></script>

		<script src="http://abtf.iisdev.se:8080/application.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			// Prenumerera på kanalen för rummet
			var channel = new Juggernaut;
			channel.subscribe("osc", function(data){
				pushFeed(data);
			});	
			
		</script>
		
		<script src="http://127.0.0.1:8081/socket.io/socket.io.js"></script>

		<script>
		   socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: false});
		   console.log('oi');
		   socket.on('connect', function() {
		        // sends to socket.io server the host/port of oscServer
		        // and oscClient
		        socket.emit('config',
		            {
		                server: {
		                    port: 3333,
		                    host: '127.0.0.1'
		                },
		                client: {
		                    port: 3334,
		                    host: '127.0.0.1'
		                }
		            }
		        );
		    });
		
		    socket.on('message', function(obj) {
		        var status = document.getElementById("status");
		        status.innerHTML = obj[0];
//		        console.log(obj);
		    });
		</script>

	</head>
	<body scroll="no" scrolling="no" class="tug">
<!--	
	<button onclick="localOSC();">Send OSC message</button>
	<button onclick="localOSC2();">Send OSC message 2</button>
	
	<button onclick="sendOSC('mans');">Send Måns OSC message</button>
	<button onclick="sendOSC('rich');">Send Richard OSC message</button>
	<button onclick="sendOSC('anders');">Send Anders OSC message</button>
-->
	
		<script type="text/javascript">
			
			function encode_utf8( s ) {
				return unescape( encodeURIComponent( s ) );
			}
			
			function decode_utf8( s ) {
				return decodeURIComponent( escape( s ) );
			}		
			
			function pushFeed(json) {
				obj_res = jQuery.parseJSON(json);
					var id = obj_res.id;
					var x = obj_res.x;
					var y = obj_res.y;
					var color = obj_res.color;

					console.log("x : " + x + ", y: " + y);

					x = parseInt((x / 100 * 47) + 70);
					y = parseInt(127 - ((y / 100) * 77) + 50);
					
					console.log("x : " + x + ", y: " + y);

					socket.emit('oscmessage', '/oscAddress', x, y, 1);
					socket.emit('oscmessage', '/oscAddress', x, y, 0);
			}
			
			function localOSC() {
				var noteMsg = "/note";
				//socket.send('/message ', Math.floor((Math.random()*127)+1), Math.floor((Math.random()*127)+1))
				socket.emit('oscmessage', '/oscAddress', 81, 100, 1);
				socket.emit('oscmessage', '/oscAddress', 100, 100, 0);
			}
			
			function localOSC2() {
				socket.emit('oscmessage', '/oscAddress2', 79, 100, 1);
				socket.emit('oscmessage', '/oscAddress2', 100, 100, 0);
			}

			function animateCircles() {
				
			}

		</script>
	</body>
</html>