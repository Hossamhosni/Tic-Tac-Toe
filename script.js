(function () {
	'use strict';
	// define the winning formations for the game
	var winningFormations = [['1','2','3'], ['1','4','7'], ['1','5','9'], ['2','5','8'], ['3','5','7'], ['3','6','9'], ['4','5','6'], ['7','8','9']];
	var takenSquares = [];
	var xSquares = [];
	var oSquares = [];
	var playerMove = "X";
	var computerMove = "O";
	var gameOver = false;
	var gameType = 'One Player';

	// dom elements
	var p = $("#wins");
	var button = $('#playAgain');
	var board = $('.board');
	var selectionPanel = $('#selection');


	var changePlayerMove = function () {
		if (playerMove === "X") playerMove = "O";
		else playerMove = "X";
	}

	var showWinningMessage = function (move) {
		if (move === 'Draw') {
			p.text("Draw");
			p.css('display', 'block');
			button.css('display', 'block');
		} else {
			p.text(move + " wins");
			p.css('display', 'block');
			button.css('display', 'block');
		}
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




	var computerPlay = function () {

		var computerSquares = computerMove === "X" ? xSquares : oSquares;
		var playerSquares = playerMove === "X" ? xSquares: oSquares;

		var choice = -1;

		// check for possible winning move
		for (var i = 0; i < winningFormations.length; i++) {
			var currentFormation = winningFormations[i];
			if (computerSquares.includes(String(currentFormation[0])) && computerSquares.includes(String(currentFormation[1])))
			{
				if (takenSquares.indexOf(String(currentFormation[2])) === -1) {
					choice = currentFormation[2];
				}
			}
			else if (computerSquares.includes(String(currentFormation[1])) && computerSquares.includes(String(currentFormation[2])))
			{
				if (takenSquares.indexOf(String(currentFormation[0])) === -1) {
					choice = currentFormation[0];
				}

			}
			if (computerSquares.includes(String(currentFormation[0])) && computerSquares.includes(String(currentFormation[2])))
			{
				if (takenSquares.indexOf(String(currentFormation[1])) === -1) {
					choice = currentFormation[1];
				}
			}
		}

		if (choice !== -1) {
			$('#span' + choice).text(computerMove);
			takenSquares.push(String(choice));
			computerMove === "X" ? xSquares.push(String(choice)) : oSquares.push(String(choice));
			return;
		}
		// try to block the opponent from winning

		for (var i = 0; i < winningFormations.length; i++) {
			var currentFormation = winningFormations[i];
			if (playerSquares.includes(String(currentFormation[0])) && playerSquares.includes(String(currentFormation[1])))
			{
				if (takenSquares.indexOf(String(currentFormation[2])) === -1) {
					choice = currentFormation[2];
				}
			}
			else if (playerSquares.includes(String(currentFormation[1])) && playerSquares.includes(String(currentFormation[2])))
			{
				if (takenSquares.indexOf(String(currentFormation[0])) === -1) {
					choice = currentFormation[0];
				}

			}
			if (playerSquares.includes(String(currentFormation[0])) && playerSquares.includes(String(currentFormation[2])))
			{
				if (takenSquares.indexOf(String(currentFormation[1])) === -1) {
					choice = currentFormation[1];
				}
			}
		}

		if (choice !== -1) {
			$('#span' + choice).text(computerMove);
			takenSquares.push(String(choice));
			computerMove === "X" ? xSquares.push(String(choice)) : oSquares.push(String(choice));
			return;
		}

		// if no choice is available select a random square
		if (choice === -1) {
			choice = Math.floor(Math.random() * (10-1) + 1);
			while (takenSquares.indexOf(String(choice)) !== -1) {
				choice = Math.floor(Math.random() * (10-1) + 1);
			}
		}
		$('#span' + choice).text(computerMove);
		takenSquares.push(String(choice));
		computerMove === "X" ? xSquares.push(String(choice)) : oSquares.push(String(choice));
	}




	// one player or two players choice
	$('.players').click(function () {
		$('.players').css('border', 'none');
		$(this).css('border', '1px solid black');
		gameType = $(this).val();
	});

	// X-O choice
	$('.symbol').click(function () {
		$('.symbol').css('border', 'none');
		$(this).css('border', '1px solid black');
		playerMove = $(this).val();
		computerMove = playerMove === "X" ? "O" : "X";
	});

	// start the game
	$('#start').click(function () {
		startGame();
		selectionPanel.css('display', 'none');
		board.css('display', 'block');
		if (gameType === "One Player" && playerMove === "O") {
			computerPlay();
		}
	});


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
			takenSquares.push(squareNumber);
			if (checkWinning(playerMove)) {
				showWinningMessage(playerMove);
				gameOver = true;
			} else if (takenSquares.length === 9) {
				showWinningMessage("Draw");
				gameOver = true;
			}
		}

		if (gameType === "Two Players") {
			changePlayerMove();
		} else if (gameType === "One Player" && !gameOver){
			computerPlay();
			if (checkWinning(computerMove)) {
				console.log("hello");
				showWinningMessage(computerMove);
				gameOver = true;
			} else if (takenSquares.length === 9) {
				showWinningMessage("Draw");
				gameOver = true;
			}
		}

	});

	$('#playAgain').click(function (e) {
		startGame();
	});

})();
