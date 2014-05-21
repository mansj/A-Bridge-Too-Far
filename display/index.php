<!DOCTYPE html>
<html>
	<head>
		<title>OSC!</title>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<link href="css/normalize.css" rel="stylesheet">
		<link href="css/display.css" rel="stylesheet">
	</head>
	<body scroll="no" scrolling="no">

		<span id="logo">
			<svg version="1.1" id="Lager_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 width="134.526px" height="14.771px" viewBox="0 0 134.526 14.771" enable-background="new 0 0 134.526 14.771"
				 xml:space="preserve">
			<g>
				<path fill="#FFFFFF" d="M9.406,13.273l-2.223,1.499L0,4.117L6.107,0l1.248,1.851L3.471,4.47l1.852,2.748L8.938,4.78l1.243,1.844
					L6.566,9.061L9.406,13.273z"/>
				<path fill="#FFFFFF" d="M21.841,13.811V0.961h2.725v10.6h5.212v2.25H21.841z"/>
				<path fill="#FFFFFF" d="M52.673,7.368c0,2.127-0.527,3.762-1.582,4.904s-2.566,1.714-4.535,1.714s-3.48-0.571-4.535-1.714
					s-1.582-2.783-1.582-4.922s0.529-3.772,1.586-4.9s2.574-1.692,4.548-1.692s3.485,0.568,4.531,1.705S52.673,5.235,52.673,7.368z
					 M43.295,7.368c0,1.436,0.272,2.517,0.817,3.243s1.359,1.09,2.443,1.09c2.174,0,3.261-1.444,3.261-4.333
					c0-2.895-1.081-4.342-3.243-4.342c-1.084,0-1.901,0.365-2.452,1.094S43.295,5.933,43.295,7.368z"/>
				<path fill="#FFFFFF" d="M72.203,13.811l-0.932-3.059h-4.685l-0.932,3.059h-2.936l4.535-12.902h3.331l4.553,12.902H72.203z
					 M70.621,8.467c-0.861-2.771-1.346-4.339-1.455-4.702s-0.186-0.65-0.233-0.861c-0.193,0.75-0.747,2.604-1.661,5.563H70.621z"/>
				<path fill="#FFFFFF" d="M90.712,13.811h-2.725V3.229h-3.489V0.961h9.703v2.268h-3.489V13.811z"/>
				<path fill="#FFFFFF" d="M112.58,13.811h-7.4V0.961h7.4v2.232h-4.676v2.821h4.351v2.232h-4.351v3.313h4.676V13.811z"/>
				<path fill="#FFFFFF" d="M126.985,8.88v4.931h-2.725V0.961h3.744c1.746,0,3.038,0.318,3.876,0.954s1.257,1.601,1.257,2.896
					c0,0.756-0.208,1.428-0.624,2.017s-1.005,1.05-1.767,1.384c1.934,2.889,3.193,4.755,3.779,5.599h-3.023l-3.067-4.931H126.985z
					 M126.985,6.665h0.879c0.861,0,1.497-0.144,1.907-0.431s0.615-0.738,0.615-1.354c0-0.609-0.21-1.043-0.628-1.301
					c-0.419-0.258-1.068-0.387-1.947-0.387h-0.826V6.665z"/>
			</g>
			</svg>
		</span>
		
		<span id="buddha_1"></span>
		<span id="buddha_2"></span>
		
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
		<script type="text/javascript" src="/audio/buffer-loader.js"></script>
		<script type="text/javascript" src="/audio/webaudio.js"></script>
		<script type="text/javascript" src="/audio/seamlessLoop.js"></script>
		

		<script type="text/javascript">
			
			var xViewport = $(window).width();
			var yViewport = $(window).height();
			var buddhaPos = (yViewport / 2) - 400;
			var buddhaNo = 1;

			
			var styles = {
				top: ((yViewport / 2) - 150) + "px",
				left: ((xViewport / 2) - 150) + "px"
			};
			$("#logo").css(styles);
			
			animateLogo();
			buddhaFly();
			
			// Lägg till bakgrundsloop
			var loop = new SeamlessLoop();
			loop.addUri('/audio/floater_loop.mp3', 6000, "loop1");
			loop.callback(soundsLoaded);
			
			function soundsLoaded() {
				loop.start("loop1");
				loop.volume(0.5);
			};

			
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
					"opacity": "0.5"
				}, 2000, "linear");
				
				$("#circle_" + randomCircleId).animate({
					"left": "-=" + newSize * 2/2 + "px",
					"top": "-=" + newSize * 2/2 + "px",
					"width": "+=" + newSize * 2 + "px",
					"height": "+=" + newSize * 2 + "px",
					"opacity": "0"
				}, 2000, "linear");
			}
			
			function animateLogo() {
				$("#logo").animate({
					"opacity": "0.35"
				}, 4000, "linear");
				
				$("#logo").animate({
					"opacity": "0"
				}, 4000, "linear");
				window.setTimeout("animateLogo();", 12000)
			}
			
			function buddhaFly() {
				// Buddha ska animeras med random frekvens och position från botten
				randomInt = Math.floor(Math.random()*10000+5000);
				
				timer = setTimeout(function() {
					buddhaNo = (buddhaNo == 1) ? 2 : 1;
					$( "#buddha_" + buddhaNo ).animate({
						left: "100%",
						top: evenOddPlusMinus(buddhaPos, randomInt)
					}, 30000, "linear", function() {
						$('#buddha').removeAttr('style');
						buddhaFly();
					});
				}, "5000");
			}
			
			function evenOddPlusMinus(buddhaPos, randomInt) {
				var newBuddhaPos = (randomInt % 2 == 0) ? buddhaPos + (randomInt / 200) : buddhaPos - (randomInt / 200);
				return(Math.floor(newBuddhaPos));
			}
			
		</script>
	</body>
</html>