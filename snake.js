var Board = (function () {

	function Board (dim) {
		this.head = new Board.Segment(4, 4);
		this.lastDirection = { x: -1, y: 0};
		this.segments = [this.head];
		this.apples = [];
		this.apple(5, 5);
		this.direction = { x: 0, y: 0};
		this.dim = dim;
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
					newRow.push("_");
			}
			board.push(newRow);
		}

		for (var i = 0; i < this.apples.length; i++) {
			board[this.apples[i].y][this.apples[i].x] = "A";
			}

		var runner = this.head;
		while (runner) {
			board[runner.y][runner.x] = "*";
			runner = runner.child;
		}

		return board;
	}

	Board.prototype.setDirection = function (x, y) {
		this.direction = {x: x, y: y};
	}
	Board.prototype.move = function () {
		var dir = this.direction || this.lastDirection;

		if (this.isInvalidDir(dir)) {
			console.log("Invalid move!");
			this.direction = this.lastDirection;
			return false;
		}

		var newPos = {x: this.head.x + dir.x,
									y: this.head.y + dir.y};
		if (this.isInvalidMove(newPos)) {
			console.log("You're going off screen!");
			this.setDirection(0, 0);
			this.lastDirection = this.direction;
			return false;
		}

		if (this.hasApple(dir)) {

			this.addSegment(newPos.x, newPos.y);

			for (var i = 0; i < this.apples.length; i++){
				var apple = this.apples[i];
				if (apple.x === newPos.x && apple.y === newPos.y) {
					this.apples.splice(i, 1);
				}
				this.apple(Math.floor(Math.random() * this.dim),
									 Math.floor(Math.random() * this.dim));
			}
		}
		this.slide(dir);
		this.lastDirection = dir;
		this.direction = null;
		return true;
	}

	Board.prototype.isInvalidDir = function (dir) {
		return (dir.x === -this.lastDirection.x &&
						dir.y === -this.lastDirection.y);
	}

	Board.prototype.isInvalidMove = function (move) {
		return (move.x >= this.dim || move.y >= this.dim || move.x < 0 || move.y < 0);
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

		//Slides all back segments forward

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

		var runner = this.head;
		while(runner){
			console.log(runner);
			runner = runner.child;
		}

	}

	return Board;
})();

// var b = new Board(10);
// console.log();
// b.display();
// b.setDirection(1, 0);
// b.move();
// console.log();
// b.display();
// b.setDirection(0, 1);
// b.move();
// console.log();
// b.display();
// b.move();
// b.display();