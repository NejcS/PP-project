$( document ).ready( function() {
	var resultContainer = $("input.result");
	var numContainer1 = $("span.number1");
	var numContainer2 = $("span.number2");
	var operatorContainer = $("span.operator");
	
	resultContainer.focus();
	var progress = 0, firstGame = true;
	var game;

	function addProgress( success ) {
		if ( success ) {
			$("div.score").append("<div class='icon'><div class='circle'></div></div>");
		} else {
			$("div.score").append("<div class='icon'><div class='circle red'></div></div>");
		}
	}

	function startGame() {
		progress++;

		if ( operatorContainer.html() == "+" ) {
			var result = Number( numContainer1.html() )	+ Number( numContainer2.html() );
		} else if ( operatorContainer.html() == "-" ){
			var result = Number( numContainer1.html() )	- Number( numContainer2.html() );
		} else if ( operatorContainer.html() == "*" ) {
			var result = Number( numContainer1.html() )	* Number( numContainer2.html() );
		} else if ( operatorContainer.html() == "/" ) {
			var result = Number( numContainer1.html() )	/ Number( numContainer2.html() );
		}

		if ( result == Number( resultContainer.val() )){
			addProgress( true );
		} else {
			addProgress( false );
		}

		resultContainer.val("");
		
		if ( progress == 9){
			clearInterval( game );
			return;
		}


		var a = Math.floor( Math.random() * 9) + 1, 
			b = Math.floor( Math.random() * 9) + 1, 
			operator = Math.random();

		operator = operator < 0.5 ? ( operator < 0.25 ? "+" : "-" ) : ( operator < 0.75 ? "*" : "/");
		operatorContainer.html( operator );
		numContainer1.html( a );
		numContainer2.html( b );
	}

	// start game loop
	game = setInterval(startGame, 1500);
});