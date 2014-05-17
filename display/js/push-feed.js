			function pushFeed(json) {
				obj_res = jQuery.parseJSON(json);
					var id = obj_res.id;
					var x = obj_res.x;
					var y = obj_res.y;
					var colorhex = obj_res.colorhex;
					
					var noteAr = [91, 93, 95, 96, 98, 100, 102, 103, 105, 107, 109];
					
					if (y > 100) { y = 100; }
					
					animateCircles(id, x, y, colorhex);

					console.log("x : " + x + ", y: " + y);

					x = parseInt(x) + 27;					
					
					if (y < 33) {
						message = "/oscAddress";
						y = y * 3;
						tempy = 10 - parseInt(y/10);
						outy = noteAr[tempy];
					}
					else if (y < 66) {
						message = "/oscAddress2";
						y = (y - 33) * 3;
						tempy = 10 - parseInt(y/10);
						outy = noteAr[tempy];
					}
					else {
						message = "/oscAddress3";
						y = (y - 66) * 3;
						tempy = 10 - parseInt(y/10);
						outy = noteAr[tempy];						
					}
					
					console.log("sx : " + x + ", sy: " + outy + ", tempy: " + tempy);

					socket.emit('oscmessage', message, outy, x, 1);
					socket.emit('oscmessage', message, outy, x, 0);
			}