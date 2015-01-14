$( document ).ready( function() {
	var resultContainer = $("input.result");
	var numContainer1 = $("span.number1");
	var numContainer2 = $("span.number2");
	var operatorContainer = $("span.operator");
	resultContainer.focus();
	var progress = 0, successRate = 0;
	var game, time;

	if (level == 1 || level == 2) {
		time1 = 2000;
	} else if (level == 3) {
		time1 = 1500;
	}
	

	function addProgress( success ) {
		if ( success ) {
			$("div.score").append("<div class='icon'><div class='circle'></div></div>");
		} else {
			$("div.score").append("<div class='icon'><div class='circle red'></div></div>");
		}
	}

	function sendResult() {
		$(".alert-success").append( " " + String( successRate ) + " / " + String( progress ) ).show();
		
		$.ajax({
			url: '/result',
			type: 'POST',
			data: { result: successRate }
		});
	}

	function startGame() {
		progress++;

		if ( operatorContainer.html() == "+" ) {
			var result = Number( numContainer1.html() )	+ Number( numContainer2.html() );
		} else if ( operatorContainer.html() == "-" ) {
			var result = Number( numContainer1.html() )	- Number( numContainer2.html() );
		} else if ( operatorContainer.html() == "*" ) {
			var result = Number( numContainer1.html() )	* Number( numContainer2.html() );
		} else if ( operatorContainer.html() == "/" ) {
			var result = Number( numContainer1.html() )	/ Number( numContainer2.html() );
		}

		if ( result == Number( resultContainer.val() )){
			addProgress( true );
			successRate++;
		} else {
			addProgress( false );
		}

		resultContainer.val("");
		
		if ( progress == 10){
			clearInterval( game );
			setTimeout(sendResult, 2000);
			return;
		}

		var a = Math.floor( Math.random() * 9) + 1, 
			b = Math.floor( Math.random() * 9) + 1, 
			operator = Math.random();

		if (level == 1) {
			operator = operator < 0.5 ? "+" : "-";
		} else {
			operator = operator < 0.5 ? ( operator < 0.25 ? "+" : "-" ) : ( operator < 0.75 ? "*" : "/");	
		}

		operatorContainer.html( operator );
		numContainer1.html( a );
		numContainer2.html( b );
	}

	// start game loop
	$(".progress-bar").width('0');
	game = setInterval(startGame, time1);
});