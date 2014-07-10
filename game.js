(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.DIM_X = ctx.canvas.clientWidth;
    this.DIM_Y = ctx.canvas.clientHeight;
    this.FPS = 30;
    this.asteroids = [];
    this.bullets = [];
    for (var i = 0; i < 3; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y, 40));
    }
    this.ship = new Asteroids.Ship([(this.DIM_X / 2), (this.DIM_Y / 2)]);
    this.lives = 3;
  };
  
  Game.prototype.draw = function() {
    //clear
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

    //space is the place
    this.ctx.rect(0, 0, this.DIM_X, this.DIM_Y);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    
    //roids
    for (var a = 0; a < this.asteroids.length; a++) {
      this.asteroids[a].draw(this.ctx);
    }
    
    //pew pew
    for (var b = 0; b < this.bullets.length; b++) {
      this.bullets[b].draw(this.ctx);
    }
    
    //zoom zoom
    this.ship.draw(this.ctx);
  };
  
  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move(this.DIM_X, this.DIM_Y);
    }
    
    for (var b = 0; b < this.bullets.length; b++) {
      this.bullets[b].move(this.DIM_X, this.DIM_Y);
      if (!this.bullets[b].alive) {
        this.bullets.splice(b, 1);
      }
    }
    
    this.ship.move(this.DIM_X, this.DIM_Y);
  };
  
  Game.prototype.step = function() {
    if (this.asteroids.length === 0) {
      clearInterval(this.intervalID);
      alert("SO LONG SPACE COWBOY");
    }
    
    this.move();
    this.draw();
    if(key.isPressed('left')) this.ship.ccw();
    if(key.isPressed('right')) this.ship.cw();
    if(key.isPressed('up')) this.ship.impulse();
    if(key.isPressed(' ') && !this.ship.refracting) {
      this.bullets.push(this.ship.fire());
    }
    
    for (var i = 0; i < this.asteroids.length; i++) {
      if(this.ship.isCollidedWith(this.asteroids[i]) && !this.ship.invincible ) {
        
        var children = this.asteroids[i].shatter(this.DIM_X, this.DIM_Y);
        this.asteroids.splice(i, 1);
        if (children) {
          this.asteroids = this.asteroids.concat(children);
        }
        
        this.lives -= 1;
        if (this.lives === 0) {
          clearInterval(this.intervalID);
          alert("MESS WITH THE BEST DIE LIKE THE REST.");
        } else {
          this.ship = new Asteroids.Ship([(this.DIM_X / 2), (this.DIM_Y / 2)]);
        }
      } 
      for (var b = 0; b < this.bullets.length; b++) {
        if (this.asteroids[i].isCollidedWith(this.bullets[b])) {
          var children = this.asteroids[i].shatter(this.DIM_X, this.DIM_Y);
          this.asteroids.splice(i, 1);
          this.bullets.splice(b, 1);
          if (children) {
            this.asteroids = this.asteroids.concat(children);
          }
        }
      }
    }    
  };

  Game.prototype.start = function() {
    this.intervalID = setInterval(this.step.bind(this), (1000/this.FPS));
  };
  
})(this);