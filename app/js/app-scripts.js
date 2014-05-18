

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
	
	// Räkna om hex till RGB
	function hexToRgb(hex) {
	hex = hex.substr(1, 6);
   	 var bigint = parseInt(hex, 16);
   	 var r = (bigint >> 16) & 255;
   	 var g = (bigint >> 8) & 255;
	    var b = bigint & 255;

	    return [r, g, b];
	}

	
	function ColorLuminance(hex, lum) {
	
		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;
	
		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}
	
		return rgb;
	}


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
			url: "http://www.floater.se/engine_osc.php?id=" + clientId + "&x=" + xPosPercent + "&y=" + yPosPercent + "&colorhex=" + colorHex
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
	}
	
	function animateMiddle() {
		var styles = {
			height: tileHeight,
			top: tileHeight + "px"
		};
		$('#middle').css(styles);
	}
	
	function animateBottom() {
		var styles = {
			height: tileHeight,
			top: (tileHeight * 2) + "px"
		};
		$('#bottom').css(styles);
	}


function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
		
