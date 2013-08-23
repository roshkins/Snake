var SnakeUI = (function (SnakeUI) {
	SnakeUI.start = function () {
		SnakeUI.bindKeys();
	};
	SnakeUI.BoardSize = 10;
	SnakeUI.Game = new Board(SnakeUI.BoardSize);
	SnakeUI.bindKeys = function () {
		$('html').keydown(function (event) {
			switch (event.keyCode) {
			case 37:
				//Left
				console.log("left");
				break;
			case 38:
				//up
				console.log("up");
				break;
			case 39:
				//right
				console.log("right");
				break;
			case 40:
				//down
				console.log("down");
				break;
			}
		});
	};
	return SnakeUI;
})(SnakeUI || {});