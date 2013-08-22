var Board = (function () {

	function Board () {
		this.head = new Board.Segment(4, 4);
		this.lastDirection = { x: 0, y: 0};
		this.segments = [this.head];
		this.apples = [];
		this.apple(5, 5);
		this.dim = 10;
	};

	Board.Segment = function (x, y) {
		this.x = x;
		this.y = y;
		this.child = null;
	}

	Board.prototype.apple = function (x, y) {
		var apple = new Board.Segment(x, y);
		this.apples.push(apple);
	}

	Board.prototype.display = function () {
		var board = [];

		for (var row = 0; row < this.dim; row++) {
			var newRow = [];

			for (var col = 0; col < this.dim; col++) {
				var runner = this.head;
				var occupied = false;

				for (var i = 0; i < this.apples.length; i++) {
					if (this.apples[i].x === col && this.apples[i].y === row) {
						newRow.push("A");
						occupied = true;
					}
				}
				while (runner) {
					if (runner.x === col && runner.y == row) {
						newRow.push("*");
						occupied = true;
					}

					runner = runner.child;
				}

				if (!occupied) {
					newRow.push("_");
				}
			}

			board.push(newRow);
		}
		console.log(board);
	}

	//dir is unit vector {x: x, y: y}.
	Board.prototype.move = function (x, y) {
		var dir = (x != null && y != null) ? {x: x, y: y} : this.lastDirection;

		if (this.isInvalidDir(dir)) {
			console.log("Invalid move!");
			return false;
		}

		var newPos = {x: this.head.x + dir.x,
									y: this.head.y + dir.y};
		if (this.isInvalidMove(newPos)) {
			console.log("You're going off screen!");
			return false;
		}

		if (this.hasApple(dir)) {

			this.addSegment(newPos.x, newPos.y);

			for (var i = 0; i < this.apples.length; i++){
				var apple = this.apples[i];
				if (apple.x === newPos.x && apple.y === newPos.y) {
					this.apples.splice(i, 1);
				}
			}
		}
		this.slide(dir);
		this.lastDirection = dir;
		return true;
	}

	Board.prototype.isInvalidDir = function (dir) {
		return (dir.x === -this.lastDirection.x &&
						dir.y === -this.lastDirection.y);
	}

	Board.prototype.isInvalidMove = function (move) {
		return (move.x > this.dim || move.y > this.dim || move.x < 0 || move.y < 0);
	}

	Board.prototype.hasApple = function (dir) {
		var newPos = {x: this.head.x + dir.x,
									y: this.head.y + dir.y};

		for (var i = 0; i < this.apples.length; i++) {
			var apple = this.apples[i];

			if (apple.x === newPos.x && apple.y === newPos.y) {
				return true;
			}
		}

		return false;
	}

	Board.prototype.slide = function (dir) {
		var runner = this.head;

		while (runner.child !== null) {
			runner.child.x = runner.x;
			runner.child.y = runner.y;
			runner = runner.child;
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

var b = new Board();
console.log();
b.display();
b.move(1, 0);
console.log();
b.display();
b.move(0, 1);
console.log();
b.display();
b.move();
b.display();