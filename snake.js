var Board = (function () {

	function Board () {
		this.head = new Board.Segment(0, 0);
		this.lastDirection = null;
		this.tail = this.head;
		this.apples = [];
	};

	Board.Segment = function (x, y) {
		this.current = { x: x, y: y };
		this.child = null;
	}
	Board.apple = function () {
	}

	//dir is unit vector {x: x, y: y}.
	Board.prototype.move = function (dir) {
		if (dir.x === -this.lastDirection.x &&
				dir.y === -this.lastDirection.y) {
					console.log("Invalid Direction.");
					return;
		}

		var newPos = {x: this.head.x + dir.x, y: this.head.y + dir.y};
		for (var i = 0; i < this.apples.length, i++) {
			var apple = this.apples[i];
			if (apple.x === newPos.x && apple.y === newPos.y) {
				this.addSegment(newPos.x, newPos.y);
			}
		}

		// Update all coordinates.
		var runner = this.head;
		while (runner.child) {
			runner.child.x = runner.x;
			runner.child.y = runner.y;
		}
		this.head.x += dir.x;
		this.head.y += dir.y;

		// Update this.direction.
		// If eating apple, add segment.

	}

	Board.prototype.addSegment = function (x, y) {
		var newHead = new Board.Segment(x, y);
		newHead.child = this.head;
		this.head = newHead;
	}

	return Board;
})()