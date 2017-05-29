(function () {
	'use strict';
	// define the winning formations for the game
	var winningFormations = [['1','2','3'], ['1','4','7'], ['1','5','9'], ['2','5','8'], ['3','5','7'], ['3','6','9'], ['4','5','6'], ['7','8','9']];
	var takenSquares = [];
	var playerMove = "X";


	var changePlayerMove = function () {
		if (playerMove === "X") playerMove = "O";
		else playerMove = "X";
	}
	// add animations when the user hovers over a cell
	$('.cell').hover(function (e) {
		var squareNumber = $(this).attr('id');
		if (takenSquares.indexOf(squareNumber) === -1) { // if the square is not taken will show the possible move to the player
			var inside = $('#span' + $(this).attr('id'));
			$(this).css('backgroundColor', '#B0C4DE');
			inside.text(playerMove);
			inside.css('color', 'black');
		}
	}, function (e) {
		var squareNumber = $(this).attr('id');
		if (takenSquares.indexOf(squareNumber) === -1) {
			var inside = $('#span' + $(this).attr('id'));
			$(this).css('backgroundColor', '#ADD8E6');
			inside.text("");
		}
		$(this).css('backgroundColor', '#ADD8E6');
	});

	$('.cell').click(function (e) {
		var squareNumber = $(this).attr('id');
		if (takenSquares.indexOf(squareNumber) === -1) {
			var inside = $('#span' + $(this).attr('id'));
			inside.text(playerMove);
			changePlayerMove();
			takenSquares.push(squareNumber);
		}
	});

})();
