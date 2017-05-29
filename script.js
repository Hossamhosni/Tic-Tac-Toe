(function () {
	'use strict';
	// define the winning formations for the game
	var winningFormations = [['1','2','3'], ['1','4','7'], ['1','5','9'], ['2','5','8'], ['3','5','7'], ['3','6','9'], ['4','5','6'], ['7','8','9']];
	var takenSquares = [];
	var xSquares = [];
	var oSquares = [];
	var playerMove = "X";
	var gameOver = false;

	// dom elements
	var p = $("#wins");
	var button = $('#playAgain');


	var changePlayerMove = function () {
		if (playerMove === "X") playerMove = "O";
		else playerMove = "X";
	}

	var showWinningMessage = function (move) {
		p.text(move + " wins");
		p.css('display', 'block');

		button.css('display', 'block');
	}

	var checkWinning = function (current) {
		var won = true;


		if (current === "X") {
			for (var i = 0; i < winningFormations.length;i++) { // for each formation
				won = true;
				var currentFormation = winningFormations[i];
				for (var j = 0; j < currentFormation.length; j++) { // check if every square is in the x squres
					if (xSquares.indexOf(currentFormation[j]) === -1) {
						won = false;
					}
				}
				if (won) {
					return won;
				}
			}
		}

		else if (current === "O") {
			for (var i = 0; i < winningFormations.length; i++) { // for each formation
				won = true;
				var currentFormation = winningFormations[i];
				for (var j = 0; j < currentFormation.length; j++) { // check if every square is in the x squres
					if (oSquares.indexOf(currentFormation[j]) === -1) {
						won = false;
					}
				}
				if (won) {
					return won;
				}
			}
		}
		return won;

	}

	var startGame = function () {
		$('span').text('');
		gameOver = false;
		xSquares = [];
		oSquares = [];
		takenSquares = [];
		p.css('display', 'none');
		button.css('display', 'none');
	}

	// add animations when the user hovers over a cell
	$('.cell').hover(function (e) {
		var squareNumber = $(this).attr('id');
		if (takenSquares.indexOf(squareNumber) === -1 && !gameOver) { // if the square is not taken will show the possible move to the player
			var inside = $('#span' + $(this).attr('id'));
			$(this).css('backgroundColor', '#B0C4DE');
			inside.text(playerMove);
			inside.css('color', 'black');
		}
	}, function (e) {
		var squareNumber = $(this).attr('id');
		if (takenSquares.indexOf(squareNumber) === -1 && !gameOver) {
			var inside = $('#span' + $(this).attr('id'));
			$(this).css('backgroundColor', '#ADD8E6');
			inside.text("");
		}
		$(this).css('backgroundColor', '#ADD8E6');
	});

	$('.cell').click(function (e) {
		var squareNumber = $(this).attr('id');
		if (takenSquares.indexOf(squareNumber) === -1 && !gameOver) {
			var inside = $('#span' + $(this).attr('id'));
			inside.text(playerMove);

			if (playerMove === "X") xSquares.push(squareNumber);
			else oSquares.push(squareNumber);

			if (checkWinning(playerMove)) {

				showWinningMessage(playerMove);
				gameOver = true;
			}
			changePlayerMove();
			takenSquares.push(squareNumber);
		}
	});

	$('#playAgain').click(function (e) {
		console.log('hello');
		startGame();
	});

})();
