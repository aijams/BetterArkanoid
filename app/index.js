const check_collision = function(entity, rect) {}

const make_ball = function(init_x, init_y, radius) {
    return {
        x: init_x
        y: init_y
        radius: radius
	draw: function(ctx) {}
	update: function(dt) {}
	check_collision: function(rect) {}
	bounding_box: function() {}
    }
}

const make_paddle = function(init_x, init_y, rect) {
    return {
	x: init_x
	y: init_y
	shape: rect
	dx: 0
	dy: 0
	draw: function(ctx) {}
	update: function(dt) {}
	bounding_box: function() {}
    }
}

const make_game = function() {
    var paddle_rect = {
	left: -50
	right: 50
	top: 10
	bottom: -10
    }
    var paddle = make_paddle(canvas.width / 2, canvas.height-10, paddle_rect)
    return {
	left_pressed: false
	right_pressed: false
	entities: [
	    paddle, ball
	]
	paddle: paddle
	init: function() {}
	update: function(dt) {
	    
	}
        play_field: {
	    x: 0
	    y: 0
	    width: canvas.width
	    height: canvas.height
	}
	key_down_handler: function(e) {
	    if (e.keyCode == 39) {
		this.right_pressed = true;
	    }
	    if (e.keyCode == 37) {
		this.left_pressed = true;
	    }
	}
	key_up_handler: function(e) {
	    if (e.keyCode == 39) {
		this.right_pressed = false;
	    }
	    if (e.keyCode == 37) {
		this.left_pressed = false;
	    }
	}
    }
}

const main = function() {
    var canvas = document.getElementById("main-game-area");
    var ctx = canvas.getContext("2d");
	
    game = make_game()
    document.addEventListener("keydown", game.key_down_handler, false);
    document.addEventListener("keyup", game.key_up_handler, false);
    setInterval(game.update, 10);
}

main()
