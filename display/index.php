<!DOCTYPE html>
<html>
	<head>
		<title>OSC!</title>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<link href="css/normalize.css" rel="stylesheet">
		<link href="css/display.css" rel="stylesheet">
	</head>
	<body scroll="no" scrolling="no">
<!--	
	<button onclick="localOSC();">Send OSC message</button>
	<button onclick="localOSC2();">Send OSC message 2</button>
	
	<button onclick="sendOSC('mans');">Send Måns OSC message</button>
	<button onclick="sendOSC('rich');">Send Richard OSC message</button>
	<button onclick="sendOSC('anders');">Send Anders OSC message</button>
-->
		
		<section id="wrapper"></section>
	
		<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="http://abtf.iisdev.se:8080/application.js" charset="utf-8"></script>
		<script type="text/javascript">
			// Prenumerera på kanalen för rummet
			var channel = new Juggernaut;
			channel.subscribe("osc", function(data){
				pushFeed(data);
			});	
			
		</script>
		<script type="text/javascript" src="http://127.0.0.1:8081/socket.io/socket.io.js"></script>

		<script type="text/javascript">
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
		
		<script type="text/javascript" src="js/push-feed.js"></script>
		<script type="text/javascript" src="js/animate-background.js"></script>
		<script type="text/javascript">
			
			var xViewport = $(window).width();
			var yViewport = $(window).height();
			
			function encode_utf8( s ) {
				return unescape( encodeURIComponent( s ) );
			}
			
			function decode_utf8( s ) {
				return decodeURIComponent( escape( s ) );
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

			function animateCircles(id, x, y, colorhex) {
				xPos = (x / 100) * xViewport;
				yPos = (y / 100) * yViewport;
				
				var randomCircleId = Math.floor(Math.random()*99999);
				
				var circle = '<span id="circle_' + randomCircleId + '" class="circle"></span>';
				$("#wrapper").append(circle);
				var styles = {
					backgroundColor: "#" + colorhex,
					top: yPos + "px",
					left: xPos + "px"
				};
				$("#circle_" + randomCircleId).css(styles);
				
				var newSize = 250;
				
				$("#circle_" + randomCircleId).animate({
					"left": "-=" + newSize/2 + "px",
					"top": "-=" + newSize/2 + "px",
					"width": "+=" + newSize + "px",
					"height": "+=" + newSize + "px",
					"opacity": "1"
				}, 2000, "linear");
				
				$("#circle_" + randomCircleId).animate({
					"left": "-=" + newSize * 2/2 + "px",
					"top": "-=" + newSize * 2/2 + "px",
					"width": "+=" + newSize * 2 + "px",
					"height": "+=" + newSize * 2 + "px",
					"opacity": "0"
				}, 2000, "linear");
				
//				$("#circle_" + id).animate(
//					
//				});
			}
		</script>
	</body>
</html>