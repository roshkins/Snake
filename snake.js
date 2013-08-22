var Board = (function () {

	function Board () {
		this.head = new Board.Segment(14, 14);
		this.lastDirection = null;
		this.apples = [];
		this.dimension = 30;
	};

	Board.Segment = function (x, y) {
		this.current = { x: x, y: y };
		this.child = null;
	}

	Board.apple = function (x, y) {

	}

	//dir is unit vector {x: x, y: y}.
	Board.prototype.move = function (dir) {
		if (this.isInvalidDir(dir)) {
			console.log("Invalid move!");
			return;
		}

		var newPos = {x: this.head.x + dir.x,
									y: this.head.y + dir.y};

		if (this.hasApple(dir)) {
			this.addSegment(newPos);
		}

		this.slide(dir);
	}

	Board.prototype.isInvalidDir = function (dir) {
		return (dir.x === -this.lastDirection.x &&
						dir.y === -this.lastDirection.y);
	}

	Board.prototype.hasApple = function (dir) {
		var newPos = {x: this.head.x + dir.x,
									y: this.head.y + dir.y};

		for (var i = 0; i < this.apples.length, i++) {
			var apple = this.apples[i];

			if (apple.x === newPos.x && apple.y === newPos.y) {
				return true;
			}
		}

		return false;
	}

	Board.prototype.slide = function (dir) {
		var runner = this.head;

		while (runner.child) {
			runner.child.x = runner.x;
			runner.child.y = runner.y;
		}

		this.head.x += dir.x;
		this.head.y += dir.y;
	}

	Board.prototype.addSegment = function (x, y) {
		var newHead = new Board.Segment(x, y);
		newHead.child = this.head;
		this.head = newHead;
	}

	return Board;
})();