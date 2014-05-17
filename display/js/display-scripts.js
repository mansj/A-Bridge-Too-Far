
//////////////////////////
// Variabler
//////////////////////////

	var airplanePos = 550;
	var owlPos = 432;


//////////////////////////
// Starta allt
//////////////////////////

	airplaneFly();
	owlFly();


//////////////////////////
// Funktioner
//////////////////////////

	function airplaneFly() {
		// Flyglanen ska animeras med random frekvens och position från botten
		randomInt = Math.floor(Math.random()*10000+5000);

		timer = setTimeout(function() {
			$( "#airplane" ).animate({
				left: "100%",
				bottom: evenOddPlusMinus(airplanePos, randomInt)
			}, 50000, "linear", function() {
				$('#airplane').removeAttr('style');
				airplaneFly();
			});
		}, randomInt);
	}

	function owlFly() {
		$( "#owl" ).animate({
			bottom: "432"
		}, 5000, "linear");

		$( "#right_wing" ).animate({
			svgFill: "#000000"
		}, 5000, "linear");
	}

	function evenOddPlusMinus(airplanePos, randomInt) {
		var newAirplanePos = (randomInt % 2 == 0) ? airplanePos + (randomInt / 200) : airplanePos - (randomInt / 200);
		return(Math.floor(newAirplanePos));
	}