var SnakeUI = (function (SnakeUI) {
	SnakeUI.start = function () {
		SnakeUI.bindKeys();
		this.tmr = setInterval(SnakeUI.moveGame, 250);
	};
	SnakeUI.BoardSize = 10;
	var Game = SnakeUI.Game = new Board(SnakeUI.BoardSize);
	SnakeUI.bindKeys = function () {
		$('html').keydown(function (event) {
			switch (event.keyCode) {
			case 37:
				//Left
				// console.log("left");
				Game.setDirection(-1, 0);
				break;
			case 38:
				//up
				// console.log("up");
				Game.setDirection(0, -1);
				break;
			case 39:
				//right
				// console.log("right");
				Game.setDirection(1,0);
				break;
			case 40:
				//down
				// console.log("down");
				Game.setDirection(0,1);
				break;
			}
		});
	};

	SnakeUI.moveGame = function () {
		if (Game.move())
		{
			$(".bodyPart").remove();
			$('pre').text(Game.display().join("\n"));
			var runner = Game.head;
			while(runner) {
				var bodyPart = $("<div class='bodyPart'></div>").css({
					left: runner.x * 10,
					top: runner.y * 10
				});
				$('body').append(bodyPart);
				runner = runner.child;
			}
		}
		else {
			clearInterval(this.tmr);
		}
	};
	return SnakeUI;
})(SnakeUI || {});