

//////////////////////////
// Variabler
//////////////////////////

	var xPosPercent, yPosPercent;
	var xViewport = $(window).width();
	var yViewport = $(window).height();


//////////////////////////
// Starta allt
//////////////////////////

	$(window).click(function(e) {
		var xPos = e.pageX;
		var yPos = e.pageY;

		xPosPercent = getPosPercent(xPos, xViewport);
		yPosPercent = getPosPercent(yPos, yViewport)
		console.log(xPosPercent + ', ' + yPosPercent);
	});


//////////////////////////
// Funktioner
//////////////////////////

	function getPosPercent(pos, viewport) {
		return Math.floor((pos / viewport) * 100);
	}

