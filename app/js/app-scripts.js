

//////////////////////////
// Variabler
//////////////////////////

	var xPos, yPos, xPosPercent, yPosPercent, clientId, colorId, colorHex;
	var arrColors = new Array(128);
	var xViewport = $(window).width();
	var yViewport = $(window).height();
	var tileHeight = Math.floor(yViewport / 3);


//////////////////////////
// Starta allt
//////////////////////////
	
	// Stoppa dra-och-panorera i mobilen
	var handleMove = function (e) {
    	if($(e.target).closest('.scrollable').length == 0) { e.preventDefault(); }
	}
	document.addEventListener('touchmove', handleMove, true);


	$(document).ready(function() {
		$("#logo").animate({
			"font-size": "+=20px",
			"opacity": "0"
		}, 3000, "linear");
	});

	// Animera fälten i appen
	animateTop();
	animateMiddle();
	animateBottom();
	
	// Skapa Id
	clientId = getClientId();

	// Välj färg
	colorId = Math.floor(Math.random()*(127-0+1)+0);
	colorHex = getColor(colorId);

	$(window).resize(function() {
		xViewport = $(window).width();
		yViewport = $(window).height();
	});

	$(document).on('click', '#wrapper', function(e) {
		xPos = e.pageX;
		yPos = e.pageY;

		xPosPercent = getPosPercent(xPos, xViewport);
		yPosPercent = getPosPercent(yPos, yViewport);
		
		sendResponse(clientId, xPosPercent, yPosPercent, colorHex);
	});

	$(document).on( "touchstart", "#wrapper", function(e) {
		xPos = e.originalEvent.touches[0].pageX;
		yPos = e.originalEvent.touches[0].pageY;

		xPosPercent = getPosPercent(xPos, xViewport);
		yPosPercent = getPosPercent(yPos, yViewport);

		sendResponse(clientId, xPosPercent, yPosPercent, colorHex);
	});


//////////////////////////
// Funktioner
//////////////////////////

	function getPosPercent(pos, viewport) {
		return Math.floor((pos / viewport) * 100);
	}

	function getClientId() {
		return Date.now() + "" + Math.floor(Math.random()*99999);
	}

	function getColor(colorId) {
		arrColors = [
        "000000", "FFFF00", "1CE6FF", "FF34FF", "FF4A46", "008941", "006FA6", "A30059",
        "FFDBE5", "7A4900", "0000A6", "63FFAC", "B79762", "004D43", "8FB0FF", "997D87",
        "5A0007", "809693", "FEFFE6", "1B4400", "4FC601", "3B5DFF", "4A3B53", "FF2F80",
        "61615A", "BA0900", "6B7900", "00C2A0", "FFAA92", "FF90C9", "B903AA", "D16100",
        "DDEFFF", "000035", "7B4F4B", "A1C299", "300018", "0AA6D8", "013349", "00846F",
        "372101", "FFB500", "C2FFED", "A079BF", "CC0744", "C0B9B2", "C2FF99", "001E09",
        "00489C", "6F0062", "0CBD66", "EEC3FF", "456D75", "B77B68", "7A87A1", "788D66",
        "885578", "FAD09F", "FF8A9A", "D157A0", "BEC459", "456648", "0086ED", "886F4C",

        "34362D", "B4A8BD", "00A6AA", "452C2C", "636375", "A3C8C9", "FF913F", "938A81",
        "575329", "00FECF", "B05B6F", "8CD0FF", "3B9700", "04F757", "C8A1A1", "1E6E00",
        "7900D7", "A77500", "6367A9", "A05837", "6B002C", "772600", "D790FF", "9B9700",
        "549E79", "FFF69F", "201625", "72418F", "BC23FF", "99ADC0", "3A2465", "922329",
        "5B4534", "FDE8DC", "404E55", "0089A3", "CB7E98", "A4E804", "324E72", "6A3A4C",
        "83AB58", "001C1E", "D1F7CE", "004B28", "C8D0F6", "A3A489", "806C66", "222800",
        "BF5650", "E83000", "66796D", "DA007C", "FF1A59", "8ADBB4", "1E0200", "5B4E51",
        "C895C5", "320033", "FF6832", "66E1D3", "CFCDAC", "D0AC94", "7ED379", "012C58"
        ];
		
		return arrColors[colorId];
	}

	function sendResponse(clientId, xPosPercent, yPosPercent, colorHex) {
		$.ajax({
			url: "http://abtf.iisdev.se/engine_osc.php?id=" + clientId + "&x=" + xPosPercent + "&y=" + yPosPercent + "&colorhex=" + colorHex
		});
		
		animateCircles(clientId, xPosPercent, yPosPercent, colorHex);
	}

	function animateCircles(id, x, y, colorhex) {
		xPos = (x / 100) * xViewport;
		yPos = (y / 100) * yViewport;
		
		var randomCircleId = Math.floor(Math.random()*99999);
		
		var circle = '<div style="z-index: 99;" id="circle_' + randomCircleId + '" class="circle"></div>';
		$("#wrapper").prepend(circle);
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
	}

	function animateTop() {
		$('#top').css('height', tileHeight); 
		$('#top').animate({ backgroundColor: "#5B4A5A"}, 4000); 
		$('#top').animate({ backgroundColor: "#3B2A3A"}, 2000); 
		window.setTimeout("animateTop();", 0);
	}
	
	function animateMiddle() {
		var styles = {
			height: tileHeight,
			top: tileHeight + "px"
		};
		$('#middle').css(styles);
		$('#middle').animate({ backgroundColor: "#AC5F67"}, 5000); 
		$('#middle').animate({ backgroundColor: "#8C3F47"}, 4000); 
		window.setTimeout("animateTop();", 0);
	}
	
	function animateBottom() {
		var styles = {
			height: tileHeight,
			top: (tileHeight * 2) + "px"
		};
		$('#bottom').css(styles);
		$('#bottom').animate({ backgroundColor: "#E75462"}, 6000); 
		$('#bottom').animate({ backgroundColor: "#C73442"}, 2000); 
		window.setTimeout("animateTop();", 0);
	}


		
