$(document).ready(function() {
	var playerTurn = "X",
		player1 = "X",
		computer = "O",
		xPlaces = [],
		oPlaces = [],
		xWins = false,
		oWins = false,
		winningFormations = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]]; //the winning formations
	var currentSquare;
	var checkWinning = function() {
		for (var i = 0;i < winningFormations.length;i++) {
			xWins = false;
			oWins = false;
			for (var j = 0; j < winningFormations[i].length;j++) {
				if (playerTurn == "X") {
					if (xPlaces.indexOf(winningFormations[i][j]) == -1) {
						xWins = false;//if we check against a winning formation and there is an element which isn't in the x Locations, we will stop checking against that formation
						break;
					}
					xWins = true;
				} else {
					if (oPlaces.indexOf(winningFormations[i][j]) == -1) {
						oWins = false;
						break;
					}
					oWins = true;
				}
			}
			if (xWins || oWins) {
				if (xWins) {
					clean("Player 1 wins");
					break;
				} else if (oWins) {
					clean("Player 2 wins");
					break;
				}
			}
		} if (xPlaces.length + oPlaces.length == 9 && !xWins && !oWins) {
			clean("Draw");
		}
		oWins = false;
		xWins = false;
	}
	var clean = function(message) {
		oPlaces = [];
		xPlaces = [];

		setTimeout(function() {
			$(".cell").text("");
		},500);
		$(".message").text(message);
		$(".message").show();
	}
	var computerPlay = function() {
		var location = Math.floor(Math.random() * 9);
		for (var i = 0; i < winningFormations.length;i++) {
			if(xPlaces.indexOf(winningFormations[i][0]) != -1 && xPlaces.indexOf(winningFormations[i][1]) != -1) location = winningFormations[i][2];
			else if(xPlaces.indexOf(winningFormations[i][1]) != -1 && xPlaces.indexOf(winningFormations[i][2]) != -1) location = winningFormations[i][0];
			else if(xPlaces.indexOf(winningFormations[i][2]) != -1 && xPlaces.indexOf(winningFormations[i][0]) != -1) location = winningFormations[i][1];
		}
		if(location == -1 || xPlaces.indexOf(location) != -1 || oPlaces.indexOf(location) != -1 && xPlaces.length + oPlaces.length != 9) {
			do {
				location = Math.floor(Math.random() * 9);
			} while(xPlaces.indexOf(location) != -1 && oPlaces.indexOf(location) != -1);
		}
		console.log(location);
		$(".cell").eq(location).text(computer);
		oPlaces[oPlaces.length] = location;
		console.log(oPlaces);
		location = -1;
	};
	var twoPlayers = function() {
		$(".cell").click(function() {
			$(".message").hide();
			currentSquare = $(".cell").index(this);
			if (xPlaces.indexOf(currentSquare) === -1 && oPlaces.indexOf(currentSquare) === -1) {
				$(this).text(playerTurn);
				if(playerTurn == "X") xPlaces[xPlaces.length] = currentSquare;
				else oPlaces[oPlaces.length] = currentSquare;
				checkWinning();

				if (playerTurn == "X") playerTurn = "O";
				else playerTurn = "X";
			}
		});
	}
	var onePlayer = function() {
		$(".cell").click(function() {
			$(".message").hide();
			currentSquare = $(".cell").index(this);
			if (xPlaces.indexOf(currentSquare) === -1 && oPlaces.indexOf(currentSquare) === -1) {
				$(this).text(playerTurn);
				if(playerTurn == "X") xPlaces[xPlaces.length] = currentSquare;
				else oPlaces[oPlaces.length] = currentSquare;
				checkWinning();
				playerTurn = "O";
				computerPlay();
				checkWinning();
				playerTurn = "X";
			}
		});
	}
	$("button").click(function() {
		if ($(this).text() == "One Player") onePlayer();
		else if($(this).text() == "Two Players") twoPlayers();
		$("table").css("display","block");
	});
});
